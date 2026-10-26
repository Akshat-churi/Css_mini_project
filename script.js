/**
 * College Virtual Lab - Malicious Program Detection Module
 * Script for interactive educational simulation of Virus Signature & Behavioral Analysis.
 */

// Fallback educational data in case fetch() is blocked when opened via local file:/// protocol
const FALLBACK_SIGNATURES = [
  {
    "id": "SIG-MAL-001",
    "sampleId": "MAL-001",
    "name": "Simulated Trojan.Downloader.SampleA",
    "pattern": "E8 00 00 00 00 5D 81 ED 12 34 56 78 8D B5",
    "description": "Simulated signature matching known Trojan dropper payload sequence in executable header."
  },
  {
    "id": "SIG-WORM-002",
    "sampleId": "MAL-LEGACY",
    "name": "Simulated Worm.Replicator.Legacy",
    "pattern": "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF",
    "description": "Simulated legacy signature for known network replication routine."
  },
  {
    "id": "SIG-SPY-003",
    "sampleId": "MAL-KEYLOG",
    "name": "Simulated Spyware.KeyLogger.Sample",
    "pattern": "55 8B EC 83 C4 F0 53 56 57 B8 ?? ?? ?? ??",
    "description": "Simulated signature detecting known keylogging hook injection pattern."
  }
];

const FALLBACK_BEHAVIORS = [
  {
    "sampleId": "CLEAN-001",
    "name": "Clean Application (TextEditor_v2.1.exe)",
    "fileType": "Simulated Windows PE Executable (GUI Application)",
    "simulatedHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "simulatedSignature": "None",
    "behaviors": {
      "processCreation": {
        "active": false,
        "detail": "Standard process initialization; no unauthorized child processes spawned."
      },
      "fileModification": {
        "active": false,
        "detail": "Only standard user document read/write operations within user-specified directories."
      },
      "persistenceAttempt": {
        "active": false,
        "detail": "No registry startup entries, scheduled tasks, or service installations attempted."
      },
      "networkActivity": {
        "active": false,
        "detail": "No outbound network or command-and-control communication detected."
      },
      "systemModification": {
        "active": false,
        "detail": "No modification of OS configuration, registry, or security policies."
      }
    }
  },
  {
    "sampleId": "MAL-001",
    "name": "Known Malicious Program (TrojanDownloader_v1.exe)",
    "fileType": "Simulated Windows PE Executable (Trojan Dropper)",
    "simulatedHash": "5d41402abc4b2a76b9719d911017c592a8624aab89b4185764d048dfd2e3ffba",
    "simulatedSignature": "SIG-MAL-001",
    "behaviors": {
      "processCreation": {
        "active": true,
        "detail": "Spawns hidden background instances of cmd.exe and powershell.exe with encoded arguments."
      },
      "fileModification": {
        "active": true,
        "detail": "Writes executable payloads into %AppData% and attempts writing to system folder."
      },
      "persistenceAttempt": {
        "active": true,
        "detail": "Injects an entry into HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run."
      },
      "networkActivity": {
        "active": true,
        "detail": "Initiates outbound encrypted HTTP/TCP connections to known malicious C2 IP: 198.51.100.24:8080."
      },
      "systemModification": {
        "active": true,
        "detail": "Attempts to disable simulated security service registry keys and tamper with firewall rules."
      }
    }
  },
  {
    "sampleId": "MAL-MOD-001",
    "name": "Modified Malicious Program (TrojanMorphed_v2.exe)",
    "fileType": "Simulated Windows PE Executable (Polymorphic Payload)",
    "simulatedHash": "9f83a45c2f82163b2f588a4498305c21de4e590025f8263cf224c61dfb68903e",
    "simulatedSignature": "None",
    "behaviors": {
      "processCreation": {
        "active": true,
        "detail": "Spawns unauthorized child process injecting shellcode into system memory space."
      },
      "fileModification": {
        "active": true,
        "detail": "Encrypts documents in Documents directory and renames files with rapid I/O bursts."
      },
      "persistenceAttempt": {
        "active": true,
        "detail": "Creates an obfuscated scheduled task to trigger execution at system reboot."
      },
      "networkActivity": {
        "active": true,
        "detail": "Attempts beaconing to untrusted external hostname resolver on non-standard port 9443."
      },
      "systemModification": {
        "active": false,
        "detail": "Avoided explicit system service changes to evade legacy static rule alerts."
      }
    }
  },
  {
    "sampleId": "UNK-001",
    "name": "Unknown Program (SysMonitorHelper_x64.exe)",
    "fileType": "Simulated Windows PE Executable (Background Utility)",
    "simulatedHash": "c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7ff310899011",
    "simulatedSignature": "None",
    "behaviors": {
      "processCreation": {
        "active": true,
        "detail": "Spawns a local helper process to sample CPU and RAM performance metrics."
      },
      "fileModification": {
        "active": false,
        "detail": "Only appends text lines into an application log file under its local install directory."
      },
      "persistenceAttempt": {
        "active": false,
        "detail": "No unauthorized startup entries detected; runs only when launched by user."
      },
      "networkActivity": {
        "active": true,
        "detail": "Transmits periodic software telemetry packets to an unverified vendor analytics server."
      },
      "systemModification": {
        "active": false,
        "detail": "Queries system hardware specs via WMI; does not modify operating system configuration."
      }
    }
  }
];

// Quiz Questions Array (8 academic questions)
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "1. What is a virus signature in signature-based malware detection?",
    options: [
      "The program author's legal digital trademark",
      "A unique, identifiable sequence of bytes or cryptographic hash extracted from known malware",
      "The memory size of the executable file in kilobytes",
      "The network bandwidth consumed by the application"
    ],
    correct: 1,
    explanation: "A virus signature is a known sequence of bytes or cryptographic hash uniquely identifying a specific malicious binary."
  },
  {
    id: 2,
    question: "2. Which of the following is a primary limitation of signature-based detection?",
    options: [
      "It requires excessive disk space to store scanning logs",
      "It cannot detect zero-day malware or polymorphic variants with modified signatures",
      "It cannot scan 64-bit operating system binaries",
      "It generates a high false-positive rate on standard text documents"
    ],
    correct: 1,
    explanation: "Signature detection relies on prior knowledge. Unknown zero-day exploits and polymorphic code lack pre-recorded signatures and easily evade lookup."
  },
  {
    id: 3,
    question: "3. What is the fundamental mechanism of behavioral analysis?",
    options: [
      "Calculating the file compression ratio",
      "Monitoring runtime actions, API invocations, and system modifications in a sandbox",
      "Scanning the binary header for alphabetical characters",
      "Checking the program's release version number"
    ],
    correct: 1,
    explanation: "Behavioral analysis observes dynamic program execution (system calls, file edits, network egress) rather than static binary appearances."
  },
  {
    id: 4,
    question: "4. When a program modifies Windows Registry 'Run' keys or creates a scheduled task, which indicator is active?",
    options: [
      "Process Creation",
      "Persistence Attempt",
      "Denial of Service",
      "Memory Buffer Overflow"
    ],
    correct: 1,
    explanation: "Modifying Run keys or scheduled tasks allows malware to persist and automatically execute upon system reboots."
  },
  {
    id: 5,
    question: "5. In this lab, why did the 'Modified Malicious Program' evade signature detection while being flagged as SUSPICIOUS?",
    options: [
      "The signature database was disabled",
      "Its code was morphed/packed to alter its hash, but dynamic behavioral analysis flagged multiple dangerous indicators",
      "The program was executed in safe mode",
      "The operating system bypassed user privilege checks"
    ],
    correct: 1,
    explanation: "Polymorphic/modified malware modifies its static pattern to avoid matching known signatures, but its underlying malicious runtime behavior remains detectable."
  },
  {
    id: 6,
    question: "6. An application displays 0 or 1 active behavioral indicators and has no signature match. What is its risk classification?",
    options: [
      "CRITICAL",
      "HIGH RISK",
      "LOW RISK (CLEAN)",
      "QUARANTINE"
    ],
    correct: 2,
    explanation: "Minimal or zero suspicious indicators combined with no signature hit indicates benign, standard software execution."
  },
  {
    id: 7,
    question: "7. Why do modern endpoint detection systems combine signature and behavioral analysis?",
    options: [
      "To provide defense-in-depth: high-speed filtering of known threats paired with proactive heuristic detection of unknown threats",
      "Because signature scanners cannot execute on multi-core processors",
      "To replace the requirement of a system firewall",
      "Because behavioral scanners never generate false positives"
    ],
    correct: 0,
    explanation: "Combining both approaches leverages signature speed and zero-false-positive rate for known malware while utilizing behavioral heuristics to capture zero-day attacks."
  },
  {
    id: 8,
    question: "8. An unknown background utility exhibits periodic telemetry egress and process creation (2 indicators). How should it be classified?",
    options: [
      "CLEAN without any monitoring",
      "SUSPICIOUS (Medium Risk), requiring administrative review and deeper sandbox observation",
      "CRITICAL MALICIOUS with immediate format of the hard drive",
      "IGNORED"
    ],
    correct: 1,
    explanation: "Programs displaying intermediate behavioral risk without an explicit malicious signature are classified as SUSPICIOUS for further investigation."
  }
];

// Global State
let signaturesData = [];
let behaviorProfilesData = [];
let currentSample = null;
let signatureScanResult = null; // { status, matchId, detection, explanation }
let behavioralScanResult = null; // { activeCount, riskLevel, indicators }
let activitySimTimer = null;
let isActivitySimRunning = false;
let liveRiskScore = 0;
let completedSampleIds = new Set(); // Tracks unique samples whose simulation/analysis is completed
// Expose state and datasets to window for testing and programmatic integration
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
window.FALLBACK_SIGNATURES = FALLBACK_SIGNATURES;
window.FALLBACK_BEHAVIORS = FALLBACK_BEHAVIORS;
Object.defineProperty(window, "signaturesData", { get: () => signaturesData, set: (v) => { signaturesData = v; } });
Object.defineProperty(window, "behaviorProfilesData", { get: () => behaviorProfilesData, set: (v) => { behaviorProfilesData = v; } });
Object.defineProperty(window, "currentSample", { get: () => currentSample, set: (v) => { currentSample = v; } });
Object.defineProperty(window, "signatureScanResult", { get: () => signatureScanResult, set: (v) => { signatureScanResult = v; } });
Object.defineProperty(window, "behavioralScanResult", { get: () => behavioralScanResult, set: (v) => { behavioralScanResult = v; } });
Object.defineProperty(window, "liveRiskScore", { get: () => liveRiskScore, set: (v) => { liveRiskScore = v; } });
Object.defineProperty(window, "completedSampleIds", { get: () => completedSampleIds, set: (v) => { completedSampleIds = v; } });

/**
 * Initializes the lab module, loads data, and registers event listeners.
 */
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  renderQuiz();
  updateProgressBar();
  addLog("Laboratory initialized. Ready for sample selection.", "info");
});

/**
 * Loads JSON data from the /data directory or falls back to embedded structures.
 */
async function loadData() {
  try {
    const [sigRes, behRes] = await Promise.all([
      fetch("data/signatures.json"),
      fetch("data/behavior-profiles.json")
    ]);

    if (sigRes.ok && behRes.ok) {
      signaturesData = await sigRes.json();
      behaviorProfilesData = await behRes.json();
      addLog("Successfully loaded signature and behavior data from JSON files.", "info");
    } else {
      throw new Error("HTTP response error");
    }
  } catch (err) {
    // Graceful fallback for local file:// protocol
    signaturesData = FALLBACK_SIGNATURES;
    behaviorProfilesData = FALLBACK_BEHAVIORS;
    addLog("Loaded internal simulated dataset (local fallback active).", "info");
  }
}

/**
 * Attach UI event listeners.
 */
function setupEventListeners() {
  const sampleSelect = document.getElementById("sample-select");
  const btnRunSignature = document.getElementById("btn-run-signature");
  const btnRunBehavior = document.getElementById("btn-run-behavior");
  const btnStartActivitySim = document.getElementById("btn-start-activity-sim");
  const btnSubmitDecision = document.getElementById("btn-submit-decision");
  const btnClearLog = document.getElementById("btn-clear-log");
  const btnResetLab = document.getElementById("btn-reset-lab");
  const btnSubmitQuiz = document.getElementById("btn-submit-quiz");
  const btnSubmitFeedback = document.getElementById("btn-submit-feedback");
  const btnGenerateReport = document.getElementById("btn-generate-report");

  if (sampleSelect) {
    sampleSelect.addEventListener("change", (e) => selectSample(e.target.value));
  }

  if (btnRunSignature) {
    btnRunSignature.addEventListener("click", runSignatureScan);
  }

  if (btnRunBehavior) {
    btnRunBehavior.addEventListener("click", runBehaviorAnalysis);
  }

  if (btnStartActivitySim) {
    btnStartActivitySim.addEventListener("click", startActivitySimulation);
  }

  if (btnSubmitDecision) {
    btnSubmitDecision.addEventListener("click", submitAnalystDecision);
  }

  if (btnClearLog) {
    btnClearLog.addEventListener("click", clearLog);
  }

  if (btnResetLab) {
    btnResetLab.addEventListener("click", resetLab);
  }

  if (btnSubmitQuiz) {
    btnSubmitQuiz.addEventListener("click", submitQuiz);
  }

  if (btnSubmitFeedback) {
    btnSubmitFeedback.addEventListener("click", showFeedback);
  }

  if (btnGenerateReport) {
    btnGenerateReport.addEventListener("click", generateLabReport);
  }
}

/**
 * Formats current system time as [HH:MM:SS].
 */
function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}

/**
 * Appends a line to the activity log terminal.
 */
function addLog(message, type = "normal") {
  const terminal = document.getElementById("terminal-log");
  if (!terminal) return;

  const timestamp = getTimestamp();
  let lineClass = "";
  if (type === "match") lineClass = "log-match";
  else if (type === "nomatch") lineClass = "log-nomatch";
  else if (type === "info") lineClass = "log-info";

  const entry = document.createElement("div");
  entry.className = `log-entry ${lineClass}`;
  entry.textContent = `${timestamp} ${message}`;

  terminal.appendChild(entry);
  terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Handles sample program selection from the dropdown.
 */
function selectSample(sampleId) {
  if (activitySimTimer) {
    clearTimeout(activitySimTimer);
    activitySimTimer = null;
  }
  isActivitySimRunning = false;

  if (!sampleId) {
    currentSample = null;
    resetAnalysisState();
    document.getElementById("sample-info-panel").style.display = "none";
    document.getElementById("btn-run-signature").disabled = true;
    const btnRunBeh = document.getElementById("btn-run-behavior");
    if (btnRunBeh) btnRunBeh.disabled = true;
    const btnStartSim = document.getElementById("btn-start-activity-sim");
    if (btnStartSim) btnStartSim.disabled = true;
    return;
  }

  // Lookup profile in loaded data
  const profile = behaviorProfilesData.find((item) => item.sampleId === sampleId);
  if (!profile) {
    alert("Sample profile not found.");
    return;
  }

  currentSample = profile;
  resetAnalysisState();

  // Populate metadata table
  document.getElementById("meta-name").textContent = profile.name;
  document.getElementById("meta-id").textContent = profile.sampleId;
  document.getElementById("meta-type").textContent = profile.fileType;
  document.getElementById("meta-hash").textContent = profile.simulatedHash;
  document.getElementById("meta-sig").textContent = profile.simulatedSignature;

  document.getElementById("sample-info-panel").style.display = "block";
  document.getElementById("btn-run-signature").disabled = false;
  const btnRunBeh = document.getElementById("btn-run-behavior");
  if (btnRunBeh) btnRunBeh.disabled = false;
  const btnStartSim = document.getElementById("btn-start-activity-sim");
  if (btnStartSim) btnStartSim.disabled = false;

  // Set Analyst sample name
  const analystSample = document.getElementById("analyst-sample-name");
  if (analystSample) analystSample.textContent = profile.name;

  addLog(`Sample selected: ${profile.name} (ID: ${profile.sampleId})`, "info");
}

/**
 * Resets runtime analysis results when a new sample is chosen.
 */
function resetAnalysisState() {
  if (activitySimTimer) {
    clearTimeout(activitySimTimer);
    activitySimTimer = null;
  }
  isActivitySimRunning = false;

  signatureScanResult = null;
  behavioralScanResult = null;

  // Reset signature result box
  document.getElementById("sig-result-box").style.display = "none";
  const sigBadge = document.getElementById("sig-status-badge");
  sigBadge.className = "status-badge badge-none";
  sigBadge.textContent = "Pending";
  document.getElementById("sig-match-id").textContent = "-";
  document.getElementById("sig-detection-label").textContent = "Pending";
  document.getElementById("sig-explanation").textContent = "-";

  // Reset behavior indicators
  const indicators = ["process", "file", "persistence", "network", "system"];
  indicators.forEach((ind) => {
    const statusEl = document.getElementById(`status-${ind}`);
    const descEl = document.getElementById(`desc-${ind}`);
    if (statusEl) {
      statusEl.className = "behavior-status status-pending";
      statusEl.textContent = "?";
    }
    if (descEl) {
      descEl.textContent = "Awaiting analysis run...";
    }
  });

  document.getElementById("behavior-result-box").style.display = "none";
  const behBadge = document.getElementById("behavior-risk-badge");
  behBadge.className = "status-badge badge-none";
  behBadge.textContent = "Pending";

  // Reset Live Risk display
  liveRiskScore = 0;
  const liveScoreText = document.getElementById("live-risk-score-text");
  if (liveScoreText) liveScoreText.textContent = "Risk Score: 0 / 5";
  const liveBadge = document.getElementById("live-risk-badge");
  if (liveBadge) {
    liveBadge.className = "status-badge badge-clean";
    liveBadge.textContent = "LOW";
  }

  // Hide Event Card
  const eventCard = document.getElementById("activity-event-card");
  if (eventCard) eventCard.style.display = "none";

  // Reset combined summary
  document.getElementById("summary-sig-val").innerHTML = `<span class="status-badge badge-none">Pending</span>`;
  document.getElementById("summary-beh-val").innerHTML = `<span class="status-badge badge-none">Pending</span>`;
  document.getElementById("summary-final-val").innerHTML = `<span class="status-badge badge-none">Pending</span>`;
  document.getElementById("combined-explanation-text").textContent =
    "Execute both Signature Scan and Behavioral Analysis to calculate final classification.";

  // Reset Why Was This Detected
  const whyDetectedEl = document.getElementById("why-detected-text");
  if (whyDetectedEl) {
    whyDetectedEl.textContent =
      "Execute both Signature Scan and Behavioral Analysis to view why this sample was classified.";
  }

  // Reset Analyst Decision
  const analystSample = document.getElementById("analyst-sample-name");
  if (analystSample) analystSample.textContent = currentSample ? currentSample.name : "-";
  const analystSig = document.getElementById("analyst-sig-result");
  if (analystSig) analystSig.textContent = "Pending";
  const analystBeh = document.getElementById("analyst-beh-risk");
  if (analystBeh) analystBeh.textContent = "Pending";
  const analystRiskPct = document.getElementById("analyst-risk-percentage");
  if (analystRiskPct) analystRiskPct.textContent = "Pending";
  const analystObs = document.getElementById("analyst-observed-indicators");
  if (analystObs) analystObs.textContent = "Pending analysis";

  const analystRadios = document.querySelectorAll('input[name="analyst_action"]');
  analystRadios.forEach((r) => (r.checked = false));

  const btnSubmitDecision = document.getElementById("btn-submit-decision");
  if (btnSubmitDecision) btnSubmitDecision.disabled = true;

  const analystAssessmentBox = document.getElementById("analyst-assessment-box");
  if (analystAssessmentBox) analystAssessmentBox.style.display = "none";

  // Reset dynamic observation
  document.getElementById("observation-placeholder").style.display = "block";
  document.getElementById("observation-dynamic").style.display = "none";
}

/**
 * Executes simulated signature scan against signatures database.
 */
function runSignatureScan() {
  if (!currentSample) return;

  addLog(`Signature scan started for sample: ${currentSample.name}`);

  // Check matching signature against local test database
  let matchedSig = signaturesData.find(
    (sig) => sig.sampleId === currentSample.sampleId || (currentSample.simulatedSignature && currentSample.simulatedSignature !== "None" && currentSample.simulatedSignature !== "NONE" && sig.id === currentSample.simulatedSignature)
  );

  const sigResultBox = document.getElementById("sig-result-box");
  const badgeEl = document.getElementById("sig-status-badge");
  const matchIdEl = document.getElementById("sig-match-id");
  const detectLabelEl = document.getElementById("sig-detection-label");
  const explainEl = document.getElementById("sig-explanation");

  sigResultBox.style.display = "block";

  if (matchedSig) {
    signatureScanResult = {
      status: "MATCH",
      matchId: matchedSig.id,
      detection: "Malicious",
      explanation: `Matched signature ${matchedSig.id} (${matchedSig.name}). ${matchedSig.description}`
    };

    badgeEl.className = "status-badge badge-malicious";
    badgeEl.textContent = "MATCH";
    matchIdEl.textContent = matchedSig.id;
    detectLabelEl.textContent = "Malicious";
    explainEl.textContent = signatureScanResult.explanation;

    addLog(`Signature database checked: ${signaturesData.length} records evaluated.`);
    addLog(`Signature MATCH confirmed: [${matchedSig.id}] -> Threat identified in test database!`, "match");
  } else {
    // If no match
    let detection = "Clean";
    let explanation = "No matching signature found in the database. File byte sequence appears clean from a static perspective.";

    if (currentSample.sampleId === "MAL-MOD-001") {
      detection = "Unknown / No Match";
      explanation = "No signature match found. Morphing or binary repacking has altered the hash/pattern, evading static detection.";
    } else if (currentSample.sampleId === "UNK-001") {
      detection = "Unknown / No Match";
      explanation = "No matching signature identified. Program binary is uncataloged in the current signature database.";
    }

    signatureScanResult = {
      status: "NO MATCH",
      matchId: "None",
      detection: detection,
      explanation: explanation
    };

    badgeEl.className = "status-badge badge-clean";
    badgeEl.textContent = "NO MATCH";
    matchIdEl.textContent = "None";
    detectLabelEl.textContent = detection;
    explainEl.textContent = explanation;

    addLog(`Signature database checked: ${signaturesData.length} records evaluated.`);
    addLog(`Signature scan completed: NO MATCH detected in local database.`, "nomatch");
  }

  // Update summary card for signature
  const summarySig = document.getElementById("summary-sig-val");
  if (signatureScanResult.status === "MATCH") {
    summarySig.innerHTML = `<span class="status-badge badge-malicious">MATCH (${signatureScanResult.matchId})</span>`;
  } else {
    summarySig.innerHTML = `<span class="status-badge badge-clean">NO MATCH</span>`;
  }

  // Update Analyst Evidence Summary for signature
  const analystSig = document.getElementById("analyst-sig-result");
  if (analystSig) {
    if (signatureScanResult.status === "MATCH") {
      analystSig.innerHTML = `<span class="status-badge badge-malicious">MATCH (${signatureScanResult.matchId})</span>`;
    } else {
      analystSig.innerHTML = `<span class="status-badge badge-clean">NO MATCH</span>`;
    }
  }

  // Trigger combined calculation if behavioral analysis was also performed
  if (behavioralScanResult) {
    generateFinalResult();
    const btnSubmitDecision = document.getElementById("btn-submit-decision");
    if (btnSubmitDecision) btnSubmitDecision.disabled = false;
  }
}

/**
 * Updates Live Behavioral Risk Score display (Feature 2).
 */
function updateLiveRiskDisplay(score) {
  const scoreText = document.getElementById("live-risk-score-text");
  const badge = document.getElementById("live-risk-badge");
  if (!scoreText || !badge) return;

  const risk = calculateRisk(score);
  scoreText.textContent = `Risk Score: ${score} / 5`;
  badge.className = `status-badge ${risk.badgeClass}`;
  badge.textContent = `${risk.level}`;
}

/**
 * Feature 1: Executes step-by-step simulated program activity observation with short delays.
 */
function startActivitySimulation() {
  if (!currentSample || isActivitySimRunning) return;

  if (activitySimTimer) {
    clearTimeout(activitySimTimer);
    activitySimTimer = null;
  }

  isActivitySimRunning = true;
  const btnStartSim = document.getElementById("btn-start-activity-sim");
  const btnRunBehavior = document.getElementById("btn-run-behavior");
  if (btnStartSim) btnStartSim.disabled = true;
  if (btnRunBehavior) btnRunBehavior.disabled = true;

  // Reset live score
  liveRiskScore = 0;
  updateLiveRiskDisplay(0);

  // Show Event Viewer
  const eventCard = document.getElementById("activity-event-card");
  const eventBadge = document.getElementById("activity-event-badge");
  const eventTitle = document.getElementById("activity-event-title");
  const eventDesc = document.getElementById("activity-event-desc");

  eventCard.style.display = "block";
  eventBadge.className = "status-badge badge-none activity-event-badge";
  eventBadge.textContent = "STARTING";
  eventTitle.textContent = "Program Execution Started";
  eventDesc.textContent = "Simulated binary initiated in sandbox execution environment.";

  if (currentSample.isUploadedFile) {
    addLog("Safe Sandbox Mode: Running simulated behavioral activity observation (binary execution disabled for security).", "info");
  } else {
    addLog("Activity simulation started", "info");
  }

  // Reset checklist items to pending visually for this run
  const indicatorKeys = [
    { key: "processCreation", name: "Process Creation", statusId: "status-process", descId: "desc-process" },
    { key: "fileModification", name: "File Modification", statusId: "status-file", descId: "desc-file" },
    { key: "persistenceAttempt", name: "Persistence Attempt", statusId: "status-persistence", descId: "desc-persistence" },
    { key: "networkActivity", name: "Suspicious Network Activity", statusId: "status-network", descId: "desc-network" },
    { key: "systemModification", name: "System Modification", statusId: "status-system", descId: "desc-system" }
  ];

  indicatorKeys.forEach((ind) => {
    const sEl = document.getElementById(ind.statusId);
    const dEl = document.getElementById(ind.descId);
    if (sEl) {
      sEl.className = "behavior-status status-pending";
      sEl.textContent = "?";
    }
    if (dEl) dEl.textContent = "Evaluating...";
  });

  let currentStepIdx = 0;

  function runNextStep() {
    if (!isActivitySimRunning) return;

    if (currentStepIdx < indicatorKeys.length) {
      const step = indicatorKeys[currentStepIdx];
      const data = currentSample.behaviors[step.key];
      const statusEl = document.getElementById(step.statusId);
      const descEl = document.getElementById(step.descId);

      if (data.active) {
        liveRiskScore++;
        if (statusEl) {
          statusEl.className = "behavior-status status-yes";
          statusEl.textContent = "✓";
        }
        if (descEl) descEl.textContent = data.detail;

        eventBadge.className = "status-badge badge-malicious activity-event-badge";
        eventBadge.textContent = "OBSERVED";
        eventTitle.textContent = step.name;
        eventDesc.textContent = `"${data.detail}"`;

        addLog(`Simulated ${step.name} observed`);
        addLog(`Risk score updated: ${liveRiskScore}/5`);
      } else {
        if (statusEl) {
          statusEl.className = "behavior-status status-no";
          statusEl.textContent = "✗";
        }
        if (descEl) descEl.textContent = data.detail;

        eventBadge.className = "status-badge badge-clean activity-event-badge";
        eventBadge.textContent = "NOT OBSERVED";
        eventTitle.textContent = step.name;
        eventDesc.textContent = `"${data.detail}"`;

        addLog(`Simulated ${step.name} not observed (normal behavior)`);
      }

      updateLiveRiskDisplay(liveRiskScore);
      currentStepIdx++;
      activitySimTimer = setTimeout(runNextStep, 800);
    } else {
      // Completed step-by-step observation
      const risk = calculateRisk(liveRiskScore);
      eventBadge.className = "status-badge badge-none activity-event-badge";
      eventBadge.textContent = "COMPLETED";
      eventTitle.textContent = "Behavioral Activity Simulation Completed";
      eventDesc.textContent = `All 5 runtime indicators observed. Active indicators: ${liveRiskScore} / 5. Calculated Risk Level: ${risk.level}.`;

      addLog("Behavioral activity simulation completed", "info");

      isActivitySimRunning = false;
      if (btnStartSim) btnStartSim.disabled = false;
      if (btnRunBehavior) btnRunBehavior.disabled = false;

      finalizeBehaviorAnalysis(liveRiskScore);
    }
  }

  activitySimTimer = setTimeout(runNextStep, 700);
}

/**
 * Executes simulated behavioral analysis and risk score calculation.
 */
function runBehaviorAnalysis() {
  if (!currentSample) return;

  if (activitySimTimer) {
    clearTimeout(activitySimTimer);
    activitySimTimer = null;
    isActivitySimRunning = false;
  }

  const btnStartSim = document.getElementById("btn-start-activity-sim");
  const btnRunBehavior = document.getElementById("btn-run-behavior");
  if (btnStartSim) btnStartSim.disabled = false;
  if (btnRunBehavior) btnRunBehavior.disabled = false;

  addLog(`Behavioral analysis started for sample: ${currentSample.name}`);

  const behaviors = currentSample.behaviors;
  let activeCount = 0;

  const mapping = [
    { key: "processCreation", statusId: "status-process", descId: "desc-process" },
    { key: "fileModification", statusId: "status-file", descId: "desc-file" },
    { key: "persistenceAttempt", statusId: "status-persistence", descId: "desc-persistence" },
    { key: "networkActivity", statusId: "status-network", descId: "desc-network" },
    { key: "systemModification", statusId: "status-system", descId: "desc-system" }
  ];

  mapping.forEach((item) => {
    const data = behaviors[item.key];
    const statusEl = document.getElementById(item.statusId);
    const descEl = document.getElementById(item.descId);

    if (data.active) {
      activeCount++;
      statusEl.className = "behavior-status status-yes";
      statusEl.textContent = "✓";
      descEl.textContent = data.detail;
    } else {
      statusEl.className = "behavior-status status-no";
      statusEl.textContent = "✗";
      descEl.textContent = data.detail;
    }
  });

  // Update live risk score display
  updateLiveRiskDisplay(activeCount);

  // Update event card
  const eventCard = document.getElementById("activity-event-card");
  const eventBadge = document.getElementById("activity-event-badge");
  const eventTitle = document.getElementById("activity-event-title");
  const eventDesc = document.getElementById("activity-event-desc");

  const riskResult = calculateRisk(activeCount);
  eventCard.style.display = "block";
  eventBadge.className = "status-badge badge-none activity-event-badge";
  eventBadge.textContent = "COMPLETED";
  eventTitle.textContent = "Behavioral Analysis Completed";
  eventDesc.textContent = `Evaluated 5 dynamic behavior indicators: ${activeCount} active indicator(s) identified. Risk Level: ${riskResult.level}.`;

  addLog(`Evaluated 5 dynamic behavior indicators: ${activeCount} active indicator(s) identified.`);
  addLog(`Calculated behavioral risk level: ${riskResult.level} RISK (${activeCount}/5).`, activeCount >= 4 ? "match" : "info");

  finalizeBehaviorAnalysis(activeCount);
}

/**
 * Finalizes behavioral calculation and updates summary tables.
 */
function finalizeBehaviorAnalysis(activeCount) {
  const riskResult = calculateRisk(activeCount);
  behavioralScanResult = {
    activeCount: activeCount,
    riskLevel: riskResult.level,
    badgeClass: riskResult.badgeClass
  };

  document.getElementById("behavior-result-box").style.display = "block";
  document.getElementById("behavior-count").textContent = `${activeCount} / 5 indicators triggered`;

  const behBadge = document.getElementById("behavior-risk-badge");
  behBadge.className = `status-badge ${riskResult.badgeClass}`;
  behBadge.textContent = `${riskResult.level} RISK`;

  // Update summary card for behavior
  const summaryBeh = document.getElementById("summary-beh-val");
  summaryBeh.innerHTML = `<span class="status-badge ${riskResult.badgeClass}">${riskResult.level} RISK</span>`;

  // Update Analyst Evidence Summary for behavior
  const analystBeh = document.getElementById("analyst-beh-risk");
  if (analystBeh) {
    analystBeh.innerHTML = `<span class="status-badge ${riskResult.badgeClass}">${riskResult.level} RISK</span>`;
  }

  // Update Analyst Evidence Summary for Risk Percentage
  const riskPercent = Math.round((activeCount / 5) * 100);
  let fillClass = "fill-clean";
  if (riskResult.level === "MEDIUM") fillClass = "fill-suspicious";
  else if (riskResult.level === "HIGH") fillClass = "fill-malicious";

  const analystRiskPct = document.getElementById("analyst-risk-percentage");
  if (analystRiskPct) {
    analystRiskPct.innerHTML = `
      <div class="analyst-risk-wrapper">
        <span class="status-badge ${riskResult.badgeClass}">${riskPercent}%</span>
        <div class="analyst-risk-bar-track" role="progressbar" aria-valuenow="${riskPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="analyst-risk-bar-fill ${fillClass}" style="width: ${riskPercent}%;"></div>
        </div>
        <span style="font-size: 13px; color: var(--secondary-color);">(${activeCount} of 5 indicators triggered)</span>
      </div>
    `;
  }

  const activeNames = [];
  const nameMap = {
    processCreation: "Process Creation",
    fileModification: "File Modification",
    persistenceAttempt: "Persistence Attempt",
    networkActivity: "Suspicious Network Activity",
    systemModification: "System Modification"
  };
  for (const k in currentSample.behaviors) {
    if (currentSample.behaviors[k].active) {
      activeNames.push(nameMap[k] || k);
    }
  }
  const analystIndicators = document.getElementById("analyst-observed-indicators");
  if (analystIndicators) {
    analystIndicators.textContent = activeNames.length > 0 ? activeNames.join(", ") : "None (Benign Execution)";
  }

  // Trigger combined calculation if signature scan was also performed
  if (signatureScanResult) {
    generateFinalResult();
    const btnSubmitDecision = document.getElementById("btn-submit-decision");
    if (btnSubmitDecision) btnSubmitDecision.disabled = false;
  }
}

/**
 * Calculates risk level based on count of active behavioral indicators.
 * 0–1 indicators = LOW
 * 2–3 indicators = MEDIUM
 * 4–5 indicators = HIGH
 */
function calculateRisk(count) {
  if (count <= 1) {
    return { level: "LOW", badgeClass: "badge-clean" };
  } else if (count <= 3) {
    return { level: "MEDIUM", badgeClass: "badge-suspicious" };
  } else {
    return { level: "HIGH", badgeClass: "badge-malicious" };
  }
}

/**
 * Synthesizes Signature Analysis and Behavioral Analysis into final detection result.
 */
function generateFinalResult() {
  if (!signatureScanResult || !behavioralScanResult || !currentSample) return;

  const finalSummaryEl = document.getElementById("summary-final-val");
  const explanationEl = document.getElementById("combined-explanation-text");

  let finalVerdict = "";
  let finalBadgeClass = "";
  let rationale = "";

  const isSigMatch = signatureScanResult.status === "MATCH";
  const risk = behavioralScanResult.riskLevel;

  if (isSigMatch) {
    finalVerdict = "MALICIOUS";
    finalBadgeClass = "badge-malicious";
    rationale = `The sample matched known virus signature (${signatureScanResult.matchId}) and exhibited ${risk} behavioral risk (${behavioralScanResult.activeCount}/5 indicators). Immediate threat confirmed.`;
  } else {
    // No signature match
    if (risk === "HIGH") {
      finalVerdict = "SUSPICIOUS";
      finalBadgeClass = "badge-suspicious";
      rationale = `No known signature was detected (NO MATCH), but dynamic behavioral analysis identified multiple high-risk indicators (${behavioralScanResult.activeCount}/5). The sample exhibits characteristics of modified/polymorphic malware or a zero-day exploit.`;
    } else if (risk === "MEDIUM") {
      finalVerdict = "SUSPICIOUS";
      finalBadgeClass = "badge-suspicious";
      rationale = `No known signature was detected, but simulated behavioral indicators revealed moderate suspicious activity (${behavioralScanResult.activeCount}/5, e.g. unverified telemetry / process spawning). Further sandbox observation is advised.`;
    } else {
      // LOW risk
      finalVerdict = "CLEAN";
      finalBadgeClass = "badge-clean";
      rationale = `No known signature match was found and behavioral indicators remained low (${behavioralScanResult.activeCount}/5). The application performs standard authorized operations and is classified as clean.`;
    }
  }

  finalSummaryEl.innerHTML = `<span class="status-badge ${finalBadgeClass}">${finalVerdict}</span>`;
  explanationEl.textContent = rationale;

  // Feature 3: Update "Why Was This Detected?" educational section
  const whyDetectedEl = document.getElementById("why-detected-text");
  if (whyDetectedEl) {
    if (currentSample.sampleId === "MAL-001") {
      whyDetectedEl.textContent =
        "This sample was detected because it matched a known malware signature and also displayed multiple suspicious behaviors.";
    } else if (currentSample.sampleId === "MAL-MOD-001") {
      whyDetectedEl.textContent =
        "Signature analysis did not find a known match because the malicious program was modified. However, behavioral analysis detected multiple suspicious activities. This demonstrates why behavioral analysis is useful for modified or previously unknown malware.";
    } else if (currentSample.sampleId === "CLEAN-001") {
      whyDetectedEl.textContent =
        "No known malicious signature was found and the program did not display significant suspicious behavior. The sample is classified as clean in this simulation.";
    } else if (currentSample.sampleId === "UNK-001") {
      whyDetectedEl.textContent =
        "No known signature was found, so behavioral evidence becomes important when deciding whether the program requires further investigation.";
    }
  }

  // Enable Analyst Decision submit button
  const btnSubmitDecision = document.getElementById("btn-submit-decision");
  if (btnSubmitDecision) btnSubmitDecision.disabled = false;

  addLog(`Combined evaluation completed -> Final Result: ${finalVerdict}`, finalVerdict === "MALICIOUS" ? "match" : (finalVerdict === "SUSPICIOUS" ? "nomatch" : "info"));

  // Update dynamic observation section
  updateObservation(finalVerdict, rationale);

  // Track sample simulation completion and advance progress bar
  if (currentSample && currentSample.sampleId) {
    if (!completedSampleIds.has(currentSample.sampleId)) {
      completedSampleIds.add(currentSample.sampleId);
      addLog(`Sample simulation completed: ${currentSample.name}`, "info");
    }
    updateProgressBar();
  }
}

/**
 * Feature 4: Evaluates the student's analyst decision based on simulated evidence.
 */
function submitAnalystDecision() {
  if (!currentSample || !behavioralScanResult) {
    alert("Please perform the analysis before submitting an analyst decision.");
    return;
  }

  const selected = document.querySelector('input[name="analyst_action"]:checked');
  if (!selected) {
    alert("Please select what the analyst should do (Allow, Investigate Further, or Quarantine).");
    return;
  }

  const action = selected.value;
  const assessmentBox = document.getElementById("analyst-assessment-box");
  const assessmentText = document.getElementById("analyst-assessment-text");

  let recommended = "allow";
  let explanation = "";

  const finalVerdict = document.getElementById("summary-final-val").textContent.trim();
  const risk = behavioralScanResult.riskLevel;

  if (finalVerdict.includes("MALICIOUS") || risk === "HIGH") {
    recommended = "quarantine";
    if (action === "quarantine") {
      explanation = "Appropriate decision. The sample exhibits confirmed malicious indicators and high behavioral risk. Immediate quarantine isolates the binary from the operating system, preventing unauthorized code execution or lateral movement.";
    } else if (action === "allow") {
      explanation = "Inappropriate decision. Allowing a confirmed malicious sample risks full system compromise, data theft, and persistence establishment. Malicious programs must be isolated immediately.";
    } else {
      explanation = "Partially appropriate, but delaying quarantine on a confirmed high-risk/malicious sample exposes the system to active infection. Immediate quarantine is the recommended best practice.";
    }
  } else if (finalVerdict.includes("SUSPICIOUS") || risk === "MEDIUM" || currentSample.sampleId === "MAL-MOD-001") {
    recommended = "investigate";
    if (action === "investigate") {
      explanation = "Appropriate decision. When an unknown or modified program exhibits suspicious behavioral indicators without a signature match, isolating it in a sandbox for deeper analysis prevents false positives while protecting the network.";
    } else if (action === "quarantine") {
      explanation = "Defensible but aggressive. While quarantine neutralizes potential zero-day threats, an analyst typically investigates medium-risk utilities first to prevent disrupting legitimate business operations.";
    } else {
      explanation = "Inappropriate / High Risk. Allowing an unverified program displaying suspicious behaviors (such as external egress or process injection) bypasses security vigilance.";
    }
  } else {
    // CLEAN / LOW
    recommended = "allow";
    if (action === "allow") {
      explanation = "Appropriate decision. The sample matched zero known malicious signatures and triggered no suspicious behavioral indicators. The program performs standard authorized operations.";
    } else {
      explanation = "Overly restrictive. The application has zero malicious findings. Unnecessary quarantine or investigation introduces operational friction for standard benign software.";
    }
  }

  const riskPercent = behavioralScanResult ? Math.round((behavioralScanResult.activeCount / 5) * 100) : 0;

  assessmentBox.style.display = "block";
  assessmentText.innerHTML = `
    <div style="margin-bottom: 8px;">
      <strong>Calculated Threat Risk:</strong> 
      <span class="status-badge ${behavioralScanResult ? behavioralScanResult.badgeClass : 'badge-none'}">${riskPercent}% (${risk} RISK)</span>
    </div>
    ${explanation}
  `;

  addLog(`Analyst decision submitted: ${action.toUpperCase()} (Threat Risk: ${riskPercent}%, Recommended: ${recommended.toUpperCase()})`, action === recommended ? "info" : "nomatch");
}

/**
 * Updates dynamic academic observation section.
 */
function updateObservation(verdict, rationale) {
  const placeholder = document.getElementById("observation-placeholder");
  const dynamicBox = document.getElementById("observation-dynamic");
  const sampleNameEl = document.getElementById("obs-sample-name");
  const keyFindingEl = document.getElementById("obs-key-finding");
  const inferenceEl = document.getElementById("obs-inference");

  placeholder.style.display = "none";
  dynamicBox.style.display = "block";

  sampleNameEl.textContent = currentSample.name;

  if (currentSample.sampleId === "CLEAN-001") {
    keyFindingEl.textContent = "Negative signature match and zero suspicious runtime behaviors.";
    inferenceEl.textContent = "Standard utility programs do not trigger signature databases or unauthorized OS-level actions. Both static and dynamic analysis concur on clean classification.";
  } else if (currentSample.sampleId === "MAL-001") {
    keyFindingEl.textContent = "Positive signature match (SIG-MAL-001) with 5/5 aggressive behavioral indicators.";
    inferenceEl.textContent = "Known threats can be stopped instantly by signature scanning before execution. Behavioral confirmation provides indisputable proof of malicious intent (process injection, persistence, C2 network connections).";
  } else if (currentSample.sampleId === "MAL-MOD-001") {
    keyFindingEl.textContent = "Negative signature match (evaded static scanner) but triggered 4/5 high-risk behavioral indicators.";
    inferenceEl.textContent = "Crucial pedagogical takeaway: Signature scanners cannot catch polymorphic or zero-day threats because their static hash/pattern has changed. Dynamic behavioral analysis is essential to detect evasion-focused malware.";
  } else if (currentSample.sampleId === "UNK-001") {
    keyFindingEl.textContent = "Negative signature match with 2/5 moderate behavioral indicators (telemetry egress & subprocess).";
    inferenceEl.textContent = "Heuristic behavioral thresholds prevent automatic categorization of ambiguous utilities as benign. Flagging medium risk ensures suspicious activities are held for sandbox quarantine or administrator review.";
  } else {
    keyFindingEl.textContent = `Verdict: ${verdict}`;
    inferenceEl.textContent = rationale;
  }
}

/**
 * Updates the simulation progress bar as each sample program is analyzed.
 * Progress advances from 0% to 100% (25% per sample across the 4 core samples).
 */
function updateProgressBar() {
  const coreSamples = [
    { id: "CLEAN-001", badgeId: "badge-sample-1", name: "Sample 1: Clean" },
    { id: "MAL-001", badgeId: "badge-sample-2", name: "Sample 2: Known Malicious" },
    { id: "MAL-MOD-001", badgeId: "badge-sample-3", name: "Sample 3: Modified (Evasion)" },
    { id: "UNK-001", badgeId: "badge-sample-4", name: "Sample 4: Unknown Utility" }
  ];

  let completedCount = 0;
  coreSamples.forEach((sample) => {
    const isDone = completedSampleIds.has(sample.id);
    if (isDone) completedCount++;

    const badgeEl = document.getElementById(sample.badgeId);
    if (badgeEl) {
      if (isDone) {
        badgeEl.className = "milestone-badge milestone-done";
        badgeEl.innerHTML = `<span class="milestone-icon">&#10003;</span> ${sample.name}`;
      } else {
        badgeEl.className = "milestone-badge";
        badgeEl.innerHTML = `<span class="milestone-icon">&#9675;</span> ${sample.name}`;
      }
    }
  });

  const percentage = Math.min(100, Math.round((completedCount / coreSamples.length) * 100));
  const fillEl = document.getElementById("progress-bar-fill");
  const percentText = document.getElementById("progress-percent-text");
  const counterText = document.getElementById("progress-counter-text");
  const trackEl = document.getElementById("progress-bar-track");

  if (fillEl) {
    fillEl.style.width = `${percentage}%`;
    if (percentage === 100) {
      fillEl.classList.add("progress-complete");
    } else {
      fillEl.classList.remove("progress-complete");
    }
  }

  if (percentText) percentText.textContent = `${percentage}%`;
  if (counterText) counterText.textContent = `${completedCount} of ${coreSamples.length} Samples Completed`;
  if (trackEl) trackEl.setAttribute("aria-valuenow", percentage);
}

/**
 * Clears the activity log terminal.
 */
function clearLog() {
  const terminal = document.getElementById("terminal-log");
  if (terminal) {
    terminal.innerHTML = "";
    addLog("Activity log cleared by user.", "info");
  }
}

/**
 * Fully resets the lab module state.
 */
function resetLab() {
  if (activitySimTimer) {
    clearTimeout(activitySimTimer);
    activitySimTimer = null;
  }
  isActivitySimRunning = false;

  // Reset select element
  const sampleSelect = document.getElementById("sample-select");
  if (sampleSelect) sampleSelect.value = "";

  currentSample = null;
  resetAnalysisState();

  document.getElementById("sample-info-panel").style.display = "none";
  document.getElementById("btn-run-signature").disabled = true;
  const btnRunBeh = document.getElementById("btn-run-behavior");
  if (btnRunBeh) btnRunBeh.disabled = true;
  const btnStartSim = document.getElementById("btn-start-activity-sim");
  if (btnStartSim) btnStartSim.disabled = true;

  // Reset Simulation Progress Bar to 0%
  completedSampleIds.clear();
  updateProgressBar();

  // Clear Activity Log
  const terminal = document.getElementById("terminal-log");
  if (terminal) {
    terminal.innerHTML = "";
    addLog("Laboratory completely reset. Ready for sample selection.", "info");
  }

  // Reset Quiz
  const quizInputs = document.querySelectorAll("#quiz-container input[type='radio']");
  quizInputs.forEach((input) => (input.checked = false));

  const feedbackBoxes = document.querySelectorAll(".quiz-feedback");
  feedbackBoxes.forEach((box) => {
    box.style.display = "none";
    box.className = "quiz-feedback";
    box.textContent = "";
  });

  const quizBanner = document.getElementById("quiz-result-banner");
  if (quizBanner) quizBanner.style.display = "none";

  // Reset Feedback Form
  const feedbackText = document.getElementById("feedback-comments");
  if (feedbackText) feedbackText.value = "";

  const feedbackRadioYes = document.querySelector("input[name='feedback_useful'][value='yes']");
  if (feedbackRadioYes) feedbackRadioYes.checked = true;

  const feedbackMsg = document.getElementById("feedback-thankyou");
  if (feedbackMsg) feedbackMsg.style.display = "none";

  // Reset Report View
  const reportView = document.getElementById("lab-report-view");
  if (reportView) reportView.style.display = "none";

  const btnPrint = document.getElementById("btn-print-report");
  if (btnPrint) btnPrint.style.display = "none";

  const repSimStatus = document.getElementById("rep-sim-status");
  if (repSimStatus) repSimStatus.textContent = "0% (0 of 4 Samples Completed)";

  const repSimScore = document.getElementById("rep-sim-score");
  if (repSimScore) repSimScore.textContent = "0% (0 / 4 Samples)";
}

/**
 * Renders the 8 self-assessment quiz questions into the DOM.
 */
function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  container.innerHTML = "";

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";
    qDiv.id = `quiz-q-${q.id}`;

    const titleEl = document.createElement("div");
    titleEl.className = "quiz-question-title";
    titleEl.textContent = q.question;
    qDiv.appendChild(titleEl);

    const optionsUl = document.createElement("ul");
    optionsUl.className = "quiz-options";

    q.options.forEach((optText, optIdx) => {
      const optLi = document.createElement("li");
      optLi.className = "quiz-option";

      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `quiz_q_${q.id}`;
      input.value = optIdx;

      label.appendChild(input);
      label.appendChild(document.createTextNode(optText));
      optLi.appendChild(label);
      optionsUl.appendChild(optLi);
    });

    qDiv.appendChild(optionsUl);

    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "quiz-feedback";
    feedbackDiv.id = `quiz-feedback-${q.id}`;
    qDiv.appendChild(feedbackDiv);

    container.appendChild(qDiv);
  });
}

/**
 * Evaluates the quiz, scores responses, displays explanations and shows score banner.
 */
function submitQuiz() {
  let score = 0;
  let total = QUIZ_QUESTIONS.length;

  QUIZ_QUESTIONS.forEach((q) => {
    const selected = document.querySelector(`input[name="quiz_q_${q.id}"]:checked`);
    const feedbackEl = document.getElementById(`quiz-feedback-${q.id}`);

    if (!selected) {
      feedbackEl.style.display = "block";
      feedbackEl.className = "quiz-feedback incorrect";
      feedbackEl.textContent = `Unanswered. Correct answer: "${q.options[q.correct]}". Explanation: ${q.explanation}`;
    } else {
      const userChoice = parseInt(selected.value, 10);
      if (userChoice === q.correct) {
        score++;
        feedbackEl.style.display = "block";
        feedbackEl.className = "quiz-feedback correct";
        feedbackEl.textContent = `Correct! ${q.explanation}`;
      } else {
        feedbackEl.style.display = "block";
        feedbackEl.className = "quiz-feedback incorrect";
        feedbackEl.textContent = `Incorrect. Correct answer: "${q.options[q.correct]}". Explanation: ${q.explanation}`;
      }
    }
  });

  const banner = document.getElementById("quiz-result-banner");
  const scoreDisplay = document.getElementById("quiz-score-display");
  if (banner && scoreDisplay) {
    scoreDisplay.textContent = score;
    banner.style.display = "block";
  }

  addLog(`Self-assessment quiz submitted. Score: ${score} / ${total}`, score >= 6 ? "match" : "info");
}

/**
 * Handles feedback submission without server round-trip.
 */
function showFeedback() {
  const feedbackMsg = document.getElementById("feedback-thankyou");
  if (feedbackMsg) {
    feedbackMsg.style.display = "block";
  }
  addLog("Student feedback submitted.", "info");
}

/**
 * Generates formal printable academic laboratory evaluation report.
 */
function generateLabReport() {
  const nameInput = document.getElementById("student-name");
  const idInput = document.getElementById("student-id");
  const instInput = document.getElementById("student-inst");

  const sName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Student Researcher";
  const sId = idInput && idInput.value.trim() ? idInput.value.trim() : "VLAB-CS-2026";
  const sInst = instInput && instInput.value.trim() ? instInput.value.trim() : "Department of Computer Engineering";

  document.getElementById("rep-name").textContent = sName;
  document.getElementById("rep-id").textContent = sId;
  document.getElementById("rep-inst").textContent = sInst;
  document.getElementById("rep-date").textContent = new Date().toLocaleString();

  // Core sample definitions
  const coreSamples = [
    { id: "CLEAN-001", name: "Sample 1: Clean Application", file: "TextEditor_v2.1.exe", defaultSig: "NO MATCH", defaultRisk: "LOW (0/5)", defaultVerdict: "CLEAN", verdictBadge: "badge-clean", defaultAction: "Allow (Verified)" },
    { id: "MAL-001", name: "Sample 2: Known Malicious Program", file: "TrojanDownloader_v1.exe", defaultSig: "MATCH (SIG-MAL-001)", defaultRisk: "HIGH (5/5)", defaultVerdict: "MALICIOUS", verdictBadge: "badge-malicious", defaultAction: "Quarantine (Verified)" },
    { id: "MAL-MOD-001", name: "Sample 3: Modified Malicious Program", file: "TrojanMorphed_v2.exe", defaultSig: "NO MATCH (Evaded)", defaultRisk: "HIGH (4/5)", defaultVerdict: "SUSPICIOUS", verdictBadge: "badge-suspicious", defaultAction: "Investigate Further (Verified)" },
    { id: "UNK-001", name: "Sample 4: Unknown Program", file: "SysMonitorHelper_x64.exe", defaultSig: "NO MATCH", defaultRisk: "MEDIUM (2/5)", defaultVerdict: "SUSPICIOUS", verdictBadge: "badge-suspicious", defaultAction: "Investigate Further (Verified)" }
  ];

  // Calculate percentage of simulation performed
  let completedCount = 0;
  coreSamples.forEach((sample) => {
    if (completedSampleIds.has(sample.id)) completedCount++;
  });

  const simPercent = Math.min(100, Math.round((completedCount / coreSamples.length) * 100));

  const repSimStatus = document.getElementById("rep-sim-status");
  if (repSimStatus) {
    repSimStatus.textContent = `${simPercent}% (${completedCount} of ${coreSamples.length} Samples Completed)`;
  }

  const repSimScore = document.getElementById("rep-sim-score");
  if (repSimScore) {
    repSimScore.textContent = `${simPercent}% (${completedCount} / ${coreSamples.length} Samples Completed)`;
  }

  const repSimBanner = document.getElementById("rep-sim-banner");
  if (repSimBanner) {
    if (simPercent === 100) {
      repSimBanner.style.background = "var(--success-bg)";
      repSimBanner.style.borderColor = "var(--success-border)";
      repSimBanner.style.color = "var(--success-color)";
    } else if (simPercent >= 50) {
      repSimBanner.style.background = "var(--info-bg)";
      repSimBanner.style.borderColor = "var(--info-border)";
      repSimBanner.style.color = "var(--info-color)";
    } else {
      repSimBanner.style.background = "var(--warning-bg)";
      repSimBanner.style.borderColor = "var(--warning-border)";
      repSimBanner.style.color = "var(--warning-color)";
    }
  }

  // Quiz score
  const scoreDisplay = document.getElementById("quiz-score-display");
  const scoreVal = scoreDisplay ? parseInt(scoreDisplay.textContent, 10) || 0 : 0;
  const scorePercent = Math.round((scoreVal / 8) * 100);
  let gradeBadge = "Proficient";
  if (scoreVal >= 7) gradeBadge = "Distinction";
  else if (scoreVal < 5) gradeBadge = "Satisfactory";

  document.getElementById("rep-quiz-score").textContent = `${scoreVal} / 8 (${scorePercent}% - ${gradeBadge})`;
  const repQuizStatus = document.getElementById("rep-quiz-status");
  if (repQuizStatus) {
    repQuizStatus.textContent = `${scoreVal} / 8 (${scorePercent}% - ${gradeBadge})`;
  }

  // Summary table of tested samples with simulation status for each
  const tbody = document.getElementById("rep-samples-tbody");
  if (tbody) {
    let rowsHtml = "";
    coreSamples.forEach((sample) => {
      const isDone = completedSampleIds.has(sample.id);
      const statusBadge = isDone
        ? `<span class="status-badge badge-clean">Completed</span>`
        : `<span class="status-badge badge-none">Pending Run</span>`;
      
      rowsHtml += `
        <tr>
          <td><strong>${sample.name}</strong> (${sample.file})</td>
          <td>${statusBadge}</td>
          <td><span class="status-badge ${sample.defaultSig.includes('MATCH') && !sample.defaultSig.includes('NO') ? 'badge-malicious' : 'badge-clean'}">${sample.defaultSig}</span></td>
          <td>${sample.defaultRisk}</td>
          <td><span class="status-badge ${sample.verdictBadge}">${sample.defaultVerdict}</span></td>
          <td>${sample.defaultAction}</td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;
  }

  const reportView = document.getElementById("lab-report-view");
  if (reportView) reportView.style.display = "block";

  const btnPrint = document.getElementById("btn-print-report");
  if (btnPrint) btnPrint.style.display = "inline-block";

  addLog(`Laboratory practical report generated for student: ${sName} (${sId}) | Simulation Progress: ${simPercent}%`, "info");
}

