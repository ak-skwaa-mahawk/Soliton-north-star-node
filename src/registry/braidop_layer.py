import json
import hashlib
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

REGISTRY_FILE = Path("soliton_registry.jsonl")

class BraidOpLayer:
    """
    Unified sovereign layer:
    - Logs braid ops
    - Logs revocations
    - Resolves lineage with revocation applied
    """

    def __init__(self, registry_path: Path = REGISTRY_FILE):
        self.path = registry_path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        if not self.path.exists():
            self.path.touch()

    # -------------------------
    # Internal: load entries
    # -------------------------
    def _load(self) -> List[Dict[str, Any]]:
        if not self.path.exists():
            return []
        with self.path.open() as f:
            return [json.loads(line) for line in f]

    # -------------------------
    # Logging: BraidOp
    # -------------------------
    def log_braid_op(self, session_id: str, braid_word: List[Dict], before: Dict, after: Dict) -> str:
        entry = {
            "entry_type": "BRAID_OP",
            "timestamp_utc": datetime.utcnow().isoformat(),
            "session_id": session_id,
            "braid_word": braid_word,
            "before": before,
            "after": after,
            "status": "LINEAGE_TRANSFORMED"
        }

        canonical = json.dumps(entry, sort_keys=True)
        entry["hash"] = hashlib.sha256(canonical.encode()).hexdigest()

        with self.path.open("a") as f:
            f.write(json.dumps(entry) + "\n")

        print(f"[BraidOp] Logged | Session={session_id} | Hash={entry['hash'][:16]}...")
        return entry["hash"]

    # -------------------------
    # Logging: Revocation
    # -------------------------
    def revoke(self, session_id: str, braid_hash: str, reason="sovereign_recoil") -> str:
        entry = {
            "entry_type": "BRAID_OP_REVOCATION",
            "timestamp_utc": datetime.utcnow().isoformat(),
            "session_id": session_id,
            "revoked_braid_hash": braid_hash,
            "reason": reason,
            "status": "BRAID_REVOKED"
        }

        canonical = json.dumps(entry, sort_keys=True)
        entry["hash"] = hashlib.sha256(canonical.encode()).hexdigest()

        with self.path.open("a") as f:
            f.write(json.dumps(entry) + "\n")

        print(f"[Revoke] BraidOp {braid_hash[:16]}... frozen for session {session_id}")
        return entry["hash"]

    # -------------------------
    # Query: lineage resolution
    # -------------------------
    def resolve_lineage(self, session_id: str) -> Dict[str, Any]:
        entries = self._load()

        ops = [e for e in entries if e.get("session_id") == session_id]

        revoked = {
            e["revoked_braid_hash"]
            for e in ops
            if e["entry_type"] == "BRAID_OP_REVOCATION"
        }

        active = [
            e for e in ops
            if e["entry_type"] == "BRAID_OP" and e["hash"] not in revoked
        ]

        if not active:
            return {}

        active.sort(key=lambda e: e["timestamp_utc"])
        return active[-1]["after"]

    # -------------------------
    # Query: is revoked?
    # -------------------------
    def is_revoked(self, braid_hash: str) -> bool:
        entries = self._load()
        return any(
            e.get("revoked_braid_hash") == braid_hash
            for e in entries
            if e["entry_type"] == "BRAID_OP_REVOCATION"
        )