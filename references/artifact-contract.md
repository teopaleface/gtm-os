# Artifact contract

The orchestrator returns a human-readable summary followed by a JSON object that follows this shape. The JSON is the stable seam for evals and future adapters.

```json
{
  "schema_version": "1.0",
  "request_id": "string",
  "status": "READY | NEEDS_INPUT | INSUFFICIENT_EVIDENCE",
  "decision": {
    "question": "string",
    "answer": "string",
    "confidence": 0.0
  },
  "context": {
    "product": "string",
    "market": "string",
    "knowns": ["string"],
    "assumptions": ["string"],
    "unknowns": ["string"]
  },
  "tickets": [
    {
      "id": "T-001",
      "title": "string",
      "stage": "Audience",
      "playbook": "gtm-icp",
      "priority": "P0 | P1 | P2",
      "status": "blocked | ready | in_progress | done",
      "blockers": ["T-000"],
      "evidence_needed": "string",
      "acceptance_criteria": ["string"]
    }
  ],
  "artifacts": [
    {
      "type": "ICP | POSITIONING | BATTLECARD | PLAN | EXPERIMENT | OTHER",
      "title": "string",
      "summary": "string",
      "claims": [
        {
          "claim": "string",
          "kind": "fact | interpretation | hypothesis",
          "supporting_evidence_ids": ["E-001"]
        }
      ]
    }
  ],
  "evidence": [
    {
      "id": "E-001",
      "source_type": "official | customer_review | job_post | discussion | dataset | internal | other",
      "url": "https://example.com/source",
      "accessed_at": "2026-08-28",
      "excerpt": "A short excerpt, under 40 words.",
      "supports": ["the claim or decision this source informs"],
      "independence_key": "example.com"
    }
  ],
  "scores": {
    "evidence_quality": 0.0,
    "decision_readiness": 0.0,
    "actionability": 0.0,
    "completeness": 0.0,
    "overall": 0.0
  },
  "next_actions": ["string"],
  "human_decisions": ["string"]
}
```

The human-readable section should lead with the decision status, name the strongest evidence, show open unknowns, and end with the next action. It should not add a claim that is absent from the JSON object.
