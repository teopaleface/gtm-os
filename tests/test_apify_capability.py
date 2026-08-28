import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).parents[1] / "skills" / "gtm-apify" / "scripts" / "apify_capability.py"
SPEC = importlib.util.spec_from_file_location("apify_capability", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class ApifyCapabilityTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.capabilities_file = Path(self.temp_dir.name) / "user-capabilities.md"
        self.capabilities_file.write_text(
            "apify: enabled\nbrowser: disabled\ncomputer_use: disabled\n",
            encoding="utf-8",
        )

    def tearDown(self):
        self.temp_dir.cleanup()

    def config(self, **overrides):
        values = {
            "APIFY_ENABLED": "true",
            "APIFY_TOKEN": "test-token",
        }
        values.update(overrides)
        return MODULE.load_config(
            env=values,
            env_file=Path("/tmp/gtm-os-no-env-file"),
            capabilities_file=self.capabilities_file,
        )

    def test_status_never_reports_token(self):
        result = MODULE.status_result(self.config())
        self.assertTrue(result["ready"])
        self.assertNotIn("test-token", result)

    def test_disabled_capability_is_not_ready(self):
        result = MODULE.status_result(self.config(APIFY_ENABLED="false"))
        self.assertFalse(result["enabled"])
        self.assertFalse(result["ready"])

    def test_markdown_switchboard_is_a_second_gate(self):
        self.capabilities_file.write_text(
            "apify: disabled\nbrowser: enabled\ncomputer_use: enabled\n",
            encoding="utf-8",
        )
        config = self.config()
        result = MODULE.status_result(config)
        self.assertFalse(result["settings_enabled"])
        self.assertFalse(result["ready"])
        self.assertTrue(result["capability_settings"]["browser"])
        with self.assertRaises(MODULE.CapabilityError) as error:
            MODULE.ensure_ready(config)
        self.assertEqual(error.exception.code, "APIFY_DISABLED_IN_SETTINGS")

    def test_browser_and_computer_use_settings_are_independent(self):
        self.capabilities_file.write_text(
            "apify: enabled\nbrowser: enabled\ncomputer_use: enabled\n",
            encoding="utf-8",
        )
        settings = dict(MODULE.load_config(
            env={"APIFY_ENABLED": "true", "APIFY_TOKEN": "test-token"},
            env_file=Path("/tmp/gtm-os-no-env-file"),
            capabilities_file=self.capabilities_file,
        ).capability_settings)
        self.assertEqual(settings, {"apify": True, "browser": True, "computer_use": True})

    def test_repository_defaults_fail_closed(self):
        config = MODULE.load_config(
            env={"APIFY_ENABLED": "true", "APIFY_TOKEN": "test-token"},
            env_file=Path("/tmp/gtm-os-no-env-file"),
        )
        result = MODULE.status_result(config)
        self.assertFalse(result["settings_enabled"])
        self.assertFalse(result["ready"])

    def test_env_is_the_apify_activation_gate(self):
        config = self.config()
        self.assertTrue(MODULE.status_result(config)["ready"])
        MODULE.ensure_ready(config)

    def test_dotenv_is_overridden_by_process_environment(self):
        with tempfile.TemporaryDirectory() as directory:
            env_file = Path(directory) / ".env"
            env_file.write_text(
                "APIFY_ENABLED=false\nAPIFY_TOKEN=from-file\n",
                encoding="utf-8",
            )
            config = MODULE.load_config(
                env={"APIFY_ENABLED": "true", "APIFY_TOKEN": "from-process"},
                env_file=env_file,
            )
        self.assertTrue(config.enabled)
        self.assertEqual(config.token, "from-process")

    def test_product_input_is_one_public_url(self):
        actor, actor_input, provenance = MODULE.build_input(
            "product-page",
            "https://shop.example/products/widget",
            self.config(),
        )
        self.assertEqual(actor, "apify/e-commerce-scraping-tool")
        self.assertEqual(actor_input["detailsUrls"], ["https://shop.example/products/widget"])
        self.assertEqual(actor_input["maxProductResults"], 1)
        self.assertEqual(provenance["source_url"], "https://shop.example/products/widget")

    def test_search_input_is_bounded_to_one_page(self):
        actor, actor_input, _ = MODULE.build_input(
            "search",
            "invoice automation Romania",
            self.config(),
        )
        self.assertEqual(actor, "apify/google-search-scraper")
        self.assertEqual(actor_input["maxPagesPerQuery"], 1)

    def test_private_and_credential_urls_are_rejected(self):
        with self.assertRaises(MODULE.CapabilityError):
            MODULE.validate_public_url("http://127.0.0.1:8000")
        with self.assertRaises(MODULE.CapabilityError):
            MODULE.validate_public_url("https://example.com/page?token=secret")

    def test_actor_must_be_allowlisted(self):
        with self.assertRaises(MODULE.CapabilityError):
            MODULE.ensure_allowed_actor(self.config(), "someone/writes-to-crm")

    def test_actor_output_drops_headers_and_credentials(self):
        result = MODULE.sanitize_output(
            {
                "metadata": {
                    "headers": {"set-cookie": "visitor-id"},
                    "title": "Public page",
                },
                "token": "should-not-leak",
            }
        )
        self.assertNotIn("headers", result["metadata"])
        self.assertNotIn("token", result)
        self.assertEqual(result["metadata"]["title"], "Public page")


if __name__ == "__main__":
    unittest.main()
