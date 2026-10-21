# Self-Assessment Quiz

This self-assessment quiz tests your understanding of virus signatures, static scanning limitations, runtime behavioral indicators, and defense-in-depth principles.

---

### Question 1
**What is a virus signature in signature-based malware detection?**
- [ ] A) The program author's legal digital trademark
- [x] B) A unique, identifiable sequence of bytes or cryptographic hash extracted from known malware
- [ ] C) The memory size of the executable file in kilobytes
- [ ] D) The network bandwidth consumed by the application

**Correct Answer:** B  
**Explanation:** A virus signature is a known sequence of bytes or cryptographic hash uniquely identifying a specific malicious binary.

---

### Question 2
**Which of the following is a primary limitation of signature-based detection?**
- [ ] A) It requires excessive disk space to store scanning logs
- [x] B) It cannot detect zero-day malware or polymorphic variants with modified signatures
- [ ] C) It cannot scan 64-bit operating system binaries
- [ ] D) It generates a high false-positive rate on standard text documents

**Correct Answer:** B  
**Explanation:** Signature detection relies on prior knowledge. Unknown zero-day exploits and polymorphic code lack pre-recorded signatures and easily evade lookup.

---

### Question 3
**What is the fundamental mechanism of behavioral analysis?**
- [ ] A) Calculating the file compression ratio
- [x] B) Monitoring runtime actions, API invocations, and system modifications in a sandbox
- [ ] C) Scanning the binary header for alphabetical characters
- [ ] D) Checking the program's release version number

**Correct Answer:** B  
**Explanation:** Behavioral analysis observes dynamic program execution (system calls, file edits, network egress) rather than static binary appearances.

---

### Question 4
**When a program modifies Windows Registry 'Run' keys or creates a scheduled task, which indicator is active?**
- [ ] A) Process Creation
- [x] B) Persistence Attempt
- [ ] C) Denial of Service
- [ ] D) Memory Buffer Overflow

**Correct Answer:** B  
**Explanation:** Modifying Run keys or scheduled tasks allows malware to persist and automatically execute upon system reboots.

---

### Question 5
**In this lab, why did the 'Modified Malicious Program' evade signature detection while being flagged as SUSPICIOUS?**
- [ ] A) The signature database was disabled
- [x] B) Its code was morphed/packed to alter its hash, but dynamic behavioral analysis flagged multiple dangerous indicators
- [ ] C) The program was executed in safe mode
- [ ] D) The operating system bypassed user privilege checks

**Correct Answer:** B  
**Explanation:** Polymorphic/modified malware modifies its static pattern to avoid matching known signatures, but its underlying malicious runtime behavior remains detectable.

---

### Question 6
**An application displays 0 or 1 active behavioral indicators and has no signature match. What is its risk classification?**
- [ ] A) CRITICAL
- [ ] B) HIGH RISK
- [x] C) LOW RISK (CLEAN)
- [ ] D) QUARANTINE

**Correct Answer:** C  
**Explanation:** Minimal or zero suspicious indicators combined with no signature hit indicates benign, standard software execution.

---

### Question 7
**Why do modern endpoint detection systems combine signature and behavioral analysis?**
- [x] A) To provide defense-in-depth: high-speed filtering of known threats paired with proactive heuristic detection of unknown threats
- [ ] B) Because signature scanners cannot execute on multi-core processors
- [ ] C) To replace the requirement of a system firewall
- [ ] D) Because behavioral scanners never generate false positives

**Correct Answer:** A  
**Explanation:** Combining both approaches leverages signature speed and zero-false-positive rate for known malware while utilizing behavioral heuristics to capture zero-day attacks.

---

### Question 8
**An unknown background utility exhibits periodic telemetry egress and process creation (2 indicators). How should it be classified?**
- [ ] A) CLEAN without any monitoring
- [x] B) SUSPICIOUS (Medium Risk), requiring administrative review and deeper sandbox observation
- [ ] C) CRITICAL MALICIOUS with immediate format of the hard drive
- [ ] D) IGNORED

**Correct Answer:** B  
**Explanation:** Programs displaying intermediate behavioral risk without an explicit malicious signature are classified as SUSPICIOUS for further investigation.
