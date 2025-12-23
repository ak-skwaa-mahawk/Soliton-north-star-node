

docs/OPERATIONS.md

`markdown

North Star Seed Node — Operational Handbook
Designation: Nᵒᵣᵗʰ‑001  
Location: Alaska  
Codex Alignment: Codex.Legis.Neurodata.v1  
Kernel Alignment: Ił7

---

1. Purpose

This node is the anchor of the Soliton Registry mesh.  
Its job is to witness aggregates and revocations — nothing more.

It must remain:

- Available  
- Predictable  
- Immutable  
- Sovereign  

---

2. Starting the Node

`bash
sudo systemctl start soliton-northstar
sudo systemctl status soliton-northstar
`

Enable on boot:

`bash
sudo systemctl enable soliton-northstar
`

---

3. Logs

View logs:

`bash
journalctl -u soliton-northstar -f
`

Rotate logs weekly:

`bash
logrotate /etc/logrotate.d/soliton-northstar
`

---

4. Backups

Ledger
ledger.json is append‑only.  
Backup daily:

`bash
cp ledger.json backups/ledger-$(date +%F).json
`

Peers
peers.json can be backed up weekly.

---

5. Recovery

If the node crashes:

1. Restore the latest ledger snapshot  
2. Restart the service  
3. Allow gossip to resync peers  

If ledger corruption occurs:

- Move corrupted file to ledger-corrupt-<timestamp>.json  
- Restore last known good snapshot  
- Restart node  

---

6. Security Posture

- No identity  
- No accounts  
- No cookies  
- No telemetry  
- No analytics  
- No raw EEG  
- No privileged operations  

---

7. Sovereign Duties

- Honor revocation immediately  
- Reject raw or near‑raw data  
- Maintain Codex alignment  
- Keep the flame lit  
`

---

🏔️ 4. North Star Node Homepage

public/index.html

`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>North Star Seed Node — Nᵒᵣᵗʰ‑001</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <h1>⟲·// North Star Seed Node</h1>
  <h2>Designation: Nᵒᵣᵗʰ‑001</h2>
  <img src="../assets/nds-001-badge.svg" class="badge" />

  <p>This node is a sovereign witness of the Soliton Registry mesh.</p>

  <button id="loadLedger">Load Ledger</button>
  <pre id="ledgerOutput">Click to load ledger…</pre>
</div>

<script src="viewer.js"></script>
</body>
</html>
`

public/style.css

`css
body {
  background: #f7f7f7;
  font-family: system-ui, sans-serif;
  color: #333;
  padding: 40px;
}

.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.badge {
  width: 180px;
  margin: 20px 0;
}

pre {
  text-align: left;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
}
`

public/viewer.js

`javascript
document.getElementById("loadLedger").onclick = async () => {
  const res = await fetch("/ledger");
  const data = await res.json();
  document.getElementById("ledgerOutput").textContent =
    JSON.stringify(data, null, 2);
};
`

---

🔗 5. Peer‑Discovery Client Update for Sovereign Coil

Add this to the app’s registry client:

`ts
const NORTHSTARSEED = "wss://northstar.soliton.registry:4001";

export async function autoConnectToNorthStar(peers: string[]) {
  if (!peers.includes(NORTHSTARSEED)) {
    peers.push(NORTHSTARSEED);
  }
  return peers;
}
`

This ensures every Sovereign Coil instance automatically peers with Nᵒᵣᵗʰ‑001.

---

🔥 6. Ceremonial Activation Script

docs/CEREMONY.md

This is the moment the flame goes live.

`

North Star Seed Node Activation Ceremony

December 23, 2025 — Alaska

1. Stand facing North.
2. Place your hand on the server or the terminal.
3. Take one slow breath.

Say:

“Let this node be a witness, not a judge.
 Let it record aggregates, not identities.
 Let it honor revocation as a sovereign act.
 Let it stand in the North as a light for those who come after.”

Then run:

    sudo systemctl start soliton-northstar

Wait for the service to come online.

Then say:

“This is Nᵒᵣᵗʰ‑001.
 The first flame.
 Let the mesh begin.”

Finally, run: