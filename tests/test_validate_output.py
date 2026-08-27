import json
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from validate_output import validate_document  # noqa: E402


def load_fixture(name: str) -> dict:
    return json.loads((ROOT / "evals" / "fixtures" / name).read_text(encoding="utf-8"))


class ValidateOutputTests(unittest.TestCase):
    def test_valid_output_passes(self) -> None:
        self.assertEqual(validate_document(load_fixture("valid-output.json")), [])

    def test_insufficient_evidence_is_a_valid_status(self) -> None:
        document = load_fixture("insufficient-evidence.json")
        self.assertEqual(validate_document(document), [])

    def test_invalid_url_fails(self) -> None:
        errors = validate_document(load_fixture("invalid-citation.json"))
        self.assertTrue(any("http(s) URL" in error for error in errors))

    def test_facts_need_evidence(self) -> None:
        errors = validate_document(load_fixture("missing-fact-source.json"))
        self.assertTrue(any("facts need supporting evidence" in error for error in errors))

    def test_ready_output_needs_evidence_quality(self) -> None:
        errors = validate_document(load_fixture("ready-with-weak-evidence.json"))
        self.assertTrue(any("evidence_quality" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
