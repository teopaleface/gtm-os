import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "demo" / "output" / "product-page-audit.md"
REPORT = ROOT / "demo" / "output" / "product-page-report.md"
SCORE = ROOT / "demo" / "output" / "product-page-score.md"

REQUIRED_AUDIT_HEADINGS = (
    "## Status",
    "## Page score",
    "## Scope",
    "## Decision",
    "## Page facts",
    "## Claim ledger",
    "## Product-data coverage",
    "## Prioritized changes",
    "## Unknowns and limits",
    "## Sources",
)


class ProductPageAuditArtifactTests(unittest.TestCase):
    def test_demo_keeps_human_agent_and_score_outputs_separate(self) -> None:
        self.assertTrue(AUDIT.is_file())
        self.assertTrue(REPORT.is_file())
        self.assertTrue(SCORE.is_file())

        audit = AUDIT.read_text(encoding="utf-8")
        report = REPORT.read_text(encoding="utf-8")
        score = SCORE.read_text(encoding="utf-8")

        for heading in REQUIRED_AUDIT_HEADINGS:
            self.assertIn(heading, audit)
        self.assertLessEqual(len(audit.splitlines()), 60)
        self.assertIn("# Product-page report", report)
        self.assertIn("## Agent handoff", report)
        self.assertIn("demo/output/product-page-audit.md", report)
        self.assertIn("demo/output/product-page-score.md", report)
        self.assertIn("demo/output/product-page-score.md", audit)
        self.assertIn("## Category scores", score)
        self.assertIn("## Criterion ratings", score)
        self.assertIn("## Arithmetic", score)
        self.assertIn("UNSCORABLE", score)


if __name__ == "__main__":
    unittest.main()
