module.exports = [
  {
    question: 'Which principle ensures users receive only the permissions required for their job?',
    choices: ['Defense in depth', 'Least privilege', 'Separation of duties', 'Implicit deny'],
    correctAnswer: 1,
    explanation: 'Least privilege reduces attack surface by limiting user access rights.',
    domain: 'General Security Concepts',
    difficulty: 1
  },
  {
    question: 'What does the CIA triad component "Integrity" focus on?',
    choices: ['Data confidentiality', 'Data accuracy and trustworthiness', 'System uptime', 'Identity proofing'],
    correctAnswer: 1,
    explanation: 'Integrity ensures data is accurate and has not been tampered with.',
    domain: 'General Security Concepts',
    difficulty: 1
  },
  {
    question: 'Which control type is a security awareness training program?',
    choices: ['Operational', 'Physical', 'Managerial', 'Technical'],
    correctAnswer: 2,
    explanation: 'Training and policy governance are managerial/administrative controls.',
    domain: 'General Security Concepts',
    difficulty: 1
  },
  {
    question: 'Which attack commonly tricks users into revealing credentials through fake emails?',
    choices: ['DDoS', 'Phishing', 'SQL injection', 'Pass-the-hash'],
    correctAnswer: 1,
    explanation: 'Phishing is social engineering through deceptive communication.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 1
  },
  {
    question: 'What vulnerability allows attacker-supplied SQL statements to run on a database?',
    choices: ['Cross-site scripting', 'Command injection', 'SQL injection', 'Race condition'],
    correctAnswer: 2,
    explanation: 'SQL injection occurs when input is not safely parameterized.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 2
  },
  {
    question: 'Which mitigation best protects against brute-force login attempts?',
    choices: ['Input validation', 'Account lockout policy', 'Data masking', 'Snapshots'],
    correctAnswer: 1,
    explanation: 'Lockout and throttling reduce repeated password guessing.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 1
  },
  {
    question: 'A zero-day vulnerability refers to:',
    choices: ['A vulnerability with no patch available yet', 'A bug fixed on release day', 'An expired certificate', 'A disabled firewall rule'],
    correctAnswer: 0,
    explanation: 'Zero-day means defenders have had zero days to patch before exploitation.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 2
  },
  {
    question: 'What security architecture model places trust validation on every request?',
    choices: ['Air-gapped model', 'Zero Trust', 'Bell-LaPadula', 'Role mining'],
    correctAnswer: 1,
    explanation: 'Zero Trust enforces continuous verification and least privilege access.',
    domain: 'Security Architecture',
    difficulty: 1
  },
  {
    question: 'Which network design separates public-facing systems from internal LAN?',
    choices: ['VLAN trunking', 'DMZ', 'NAT64', 'Sandbox'],
    correctAnswer: 1,
    explanation: 'A DMZ creates a segmented zone for internet-facing services.',
    domain: 'Security Architecture',
    difficulty: 1
  },
  {
    question: 'What hardware security feature stores cryptographic keys securely?',
    choices: ['TPM', 'RAID controller', 'Hypervisor', 'Load balancer'],
    correctAnswer: 0,
    explanation: 'Trusted Platform Module (TPM) provides hardware-backed key protection.',
    domain: 'Security Architecture',
    difficulty: 2
  },
  {
    question: 'Which cloud model gives customers control over VMs while provider manages hardware?',
    choices: ['SaaS', 'IaaS', 'PaaS', 'FaaS'],
    correctAnswer: 1,
    explanation: 'IaaS provides virtualized compute resources and networking.',
    domain: 'Security Architecture',
    difficulty: 2
  },
  {
    question: 'What is the primary purpose of SIEM in security operations?',
    choices: ['Encrypting backups', 'Aggregating and correlating logs', 'Provisioning users', 'Patching endpoints'],
    correctAnswer: 1,
    explanation: 'SIEM centralizes logs and correlates events for monitoring and alerting.',
    domain: 'Security Operations',
    difficulty: 1
  },
  {
    question: 'During incident response, what phase involves stopping spread and limiting damage?',
    choices: ['Preparation', 'Containment', 'Lessons learned', 'Recovery'],
    correctAnswer: 1,
    explanation: 'Containment limits impact before eradication and recovery.',
    domain: 'Security Operations',
    difficulty: 1
  },
  {
    question: 'Which backup strategy allows quickest full restore with most storage cost?',
    choices: ['Differential only', 'Incremental only', 'Full backup', 'Synthetic full from tape'],
    correctAnswer: 2,
    explanation: 'Full backups restore quickly because all data is in one backup set.',
    domain: 'Security Operations',
    difficulty: 2
  },
  {
    question: 'Which metric indicates the average time to identify security incidents?',
    choices: ['MTTR', 'MTTD', 'RPO', 'SLA'],
    correctAnswer: 1,
    explanation: 'MTTD stands for Mean Time To Detect.',
    domain: 'Security Operations',
    difficulty: 2
  },
  {
    question: 'What governance document defines high-level security direction and intent?',
    choices: ['Procedure', 'Guideline', 'Policy', 'Runbook'],
    correctAnswer: 2,
    explanation: 'Policies establish mandatory requirements and strategic direction.',
    domain: 'Security Program Management and Oversight',
    difficulty: 1
  },
  {
    question: 'Which concept helps estimate financial impact of a risk event?',
    choices: ['ALE', 'MFA', 'RBAC', 'CASB'],
    correctAnswer: 0,
    explanation: 'Annualized Loss Expectancy quantifies expected yearly loss.',
    domain: 'Security Program Management and Oversight',
    difficulty: 2
  },
  {
    question: 'What regulation is focused on protecting cardholder payment data?',
    choices: ['HIPAA', 'PCI DSS', 'SOX', 'FERPA'],
    correctAnswer: 1,
    explanation: 'PCI DSS security controls apply to payment card environments.',
    domain: 'Security Program Management and Oversight',
    difficulty: 1
  },
  {
    question: 'A Business Impact Analysis primarily identifies:',
    choices: ['Firewall ACLs', 'Critical processes and recovery priorities', 'Source code bugs', 'Malware signatures'],
    correctAnswer: 1,
    explanation: 'BIA helps determine downtime tolerance and recovery requirements.',
    domain: 'Security Program Management and Oversight',
    difficulty: 2
  },
  {
    question: 'Which authentication factor is represented by a fingerprint scan?',
    choices: ['Something you know', 'Somewhere you are', 'Something you have', 'Something you are'],
    correctAnswer: 3,
    explanation: 'Biometrics are "something you are" factors.',
    domain: 'General Security Concepts',
    difficulty: 1
  },
  {
    question: 'What is the best mitigation for cross-site scripting (XSS)?',
    choices: ['Output encoding and input sanitization', 'Disable TLS', 'Open CORS to all origins', 'Use FTP only'],
    correctAnswer: 0,
    explanation: 'Proper escaping/encoding and sanitization prevent script injection.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 2
  },
  {
    question: 'Which architecture component inspects and filters traffic between segments?',
    choices: ['Proxy firewall', 'KVM switch', 'Patch panel', 'UPS'],
    correctAnswer: 0,
    explanation: 'Firewalls enforce traffic policy at network boundaries.',
    domain: 'Security Architecture',
    difficulty: 1
  },
  {
    question: 'What operation center team often performs proactive threat hunting?',
    choices: ['Blue team', 'Red team', 'Purple team', 'DevOps team'],
    correctAnswer: 0,
    explanation: 'Blue team handles defensive monitoring and hunting activities.',
    domain: 'Security Operations',
    difficulty: 2
  },
  {
    question: 'What is the purpose of a tabletop exercise?',
    choices: ['Live-fire penetration test', 'Practice response plans in a discussion-based scenario', 'Deploy patches', 'Rotate encryption keys'],
    correctAnswer: 1,
    explanation: 'Tabletop exercises validate preparedness through simulated scenarios.',
    domain: 'Security Program Management and Oversight',
    difficulty: 1
  },
  {
    question: 'Which threat actor motivation is primarily financial and highly organized?',
    choices: ['Script kiddie', 'Hacktivist', 'Organized crime', 'Insider negligence'],
    correctAnswer: 2,
    explanation: 'Organized cybercrime groups are typically profit-driven and structured.',
    domain: 'Threats, Vulnerabilities, and Mitigations',
    difficulty: 1
  }
];
