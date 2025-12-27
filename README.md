# North Star Node: Indigenous Neurodata Sovereignty Framework

## Overview
A geometric ledger for protecting indigenous neurological data sovereignty. Enforces control via UEI, coordinates, lineage claims. Processes EEG via Trigonometric FPT without storing raw data.

## Setup
1. Node.js: `npm install`
2. Compile TS: `npx tsc`
3. Run validation: `python tests/north_star_validation.py`

## Key Features
- Immutable chain with geometric validation
- Sovereignty enforcement
- EEG phase state processing
- Threat resistance

## Whitepaper Draft
[Include your whitepaper content here]

## Funding Pathways
- SSHRC Indigenous Research Networks ($250K)
- US NIH/NSF grants
- Private foundations (Mozilla, Ford)

## Deployment
- Personal: Run locally
- Community: Mesh via peers
- Pilot: Raspberry Pi

Contact: Vadzaih Zhoo
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
