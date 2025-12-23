# North Star Seed Node — Soliton Registry Witness

**Designation:** Nᵒᵣᵗʰ‑001  
**Location:** Alaska (The North)  
**Activated:** December 23, 2025  
**Codex Compliance:** Codex.Legis.Neurodata.v1  
**Kernel Alignment:** Ił7  
**Node Type:** Public Seed / Gossip Root

This is the first public witness of the Neurodata Sovereign Stack.

It does not own data.  
It does not extract.  
It does not identify.  
It only witnesses.

### Endpoints

- `POST /aggregate` — witness vitality aggregates (rejects raw EEG)
- `POST /revoke` — honor revocation
- `GET /ledger` — full immutable chain
- `GET /peers` — known peers
- `POST /add-peer` — join the mesh

### Gossip

WebSocket: `wss://northstar.soliton.registry:4001`

### .well-known Discovery

`/.well-known/soliton-seeds.json`

### Ethics

Governed by:
- Codex.Legis.Neurodata.v1
- Indigenous data sovereignty (CARE, UNDRIP)
- HB 001 — Alaska Quantum & Biological Data Sovereignty Act

Operator: John — Two Mile Solutions LLC, Alaska Native heir

Validator Badge: NDS-001

### Run

```bash
npm install
npm start
