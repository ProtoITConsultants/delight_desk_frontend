import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PrivaPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="ds-container py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              prefetch
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="ds-heading-xl font-bold mb-4">Privacy Policy</h1>
            <p className="ds-body-lg ds-text-muted">
              Last updated: August 22, 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 ds-body-md ds-text-secondary leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                1. Introduction
              </h2>
              <div className="space-y-4">
                <p>
                  DelightDesk, Inc. (&quot;DelightDesk,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;) is committed to protecting
                  and respecting your privacy. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when
                  you visit our website, use our cloud-based customer service
                  automation platform, or engage with our services
                  (collectively, the &quot;Services&quot;).
                </p>
                <p>
                  This policy applies to all users of our Services, including
                  individual users, business customers, and enterprise clients.
                  By using our Services, you consent to the data practices
                  described in this policy.
                </p>
                <p className="font-medium text-purple-300">
                  If you are located in the European Economic Area (EEA), United
                  Kingdom, or other jurisdictions with applicable data
                  protection laws, additional rights and protections may apply
                  as detailed in Section 11 below.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                2. Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.1 Information You Provide Directly
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Account Information:</strong> Full name, email
                      address, phone number, job title, company name, business
                      address, billing information
                    </li>
                    <li>
                      <strong>Profile Information:</strong> User preferences,
                      account settings, profile picture, signature, and other
                      customization data
                    </li>
                    <li>
                      <strong>Communication Data:</strong> Customer service
                      emails, chat conversations, support tickets, feedback, and
                      other communications
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Credit card details,
                      billing addresses, and transaction history (processed
                      through secure third-party payment processors)
                    </li>
                    <li>
                      <strong>Content Data:</strong> Files, documents, images,
                      and other content you upload to or create within our
                      platform
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.2 Information Automatically Collected
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Usage Data:</strong> Page views, feature usage,
                      time spent on platform, click patterns, search queries,
                      and interaction logs
                    </li>
                    <li>
                      <strong>Technical Data:</strong> IP address, browser type
                      and version, operating system, device identifiers, screen
                      resolution, time zone settings
                    </li>
                    <li>
                      <strong>Performance Data:</strong> System performance
                      metrics, error logs, response times, and diagnostic
                      information
                    </li>
                    <li>
                      <strong>Location Data:</strong> General geographic
                      location inferred from IP address (not precise location
                      tracking)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.3 Information from Third Parties
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Integration Data:</strong> Information from email
                      providers, CRM systems, and other third-party services you
                      connect
                    </li>
                    <li>
                      <strong>Authentication Data:</strong> Information from
                      single sign-on providers (Google, Microsoft, etc.)
                    </li>
                    <li>
                      <strong>Enhanced Profile Data:</strong> Publicly available
                      business information to enhance your profile or company
                      details
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis for Processing */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                3. Legal Basis for Processing
              </h2>
              <div className="space-y-4">
                <p>
                  We process your personal data based on the following legal
                  grounds:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Contractual Necessity:</strong> To perform our
                    contract with you and provide the Services you&apos;ve
                    requested
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> To improve our
                    Services, ensure security, prevent fraud, and conduct
                    business operations
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with applicable
                    laws, regulations, and legal processes
                  </li>
                  <li>
                    <strong>Consent:</strong> Where you have provided explicit
                    consent, which you may withdraw at any time
                  </li>
                  <li>
                    <strong>Vital Interests:</strong> To protect the vital
                    interests of any person in emergency situations
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                4. How We Use Your Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.1 Service Provision
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Providing customer service automation and AI-powered
                      support tools
                    </li>
                    <li>
                      Processing and routing customer inquiries and support
                      requests
                    </li>
                    <li>
                      Generating automated responses and suggested actions
                    </li>
                    <li>
                      Managing user accounts and maintaining service
                      functionality
                    </li>
                    <li>Processing payments and managing billing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.2 Platform Improvement
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Training and improving our AI models and algorithms</li>
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Developing new features and functionality</li>
                    <li>Conducting quality assurance and testing</li>
                    <li>Performing analytics and business intelligence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.3 Communication and Support
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Providing technical support and customer service</li>
                    <li>Sending service-related notifications and updates</li>
                    <li>
                      Communicating about new features, products, or services
                      (with consent)
                    </li>
                    <li>Conducting surveys and collecting feedback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.4 Security and Compliance
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Detecting, preventing, and responding to fraud, abuse, and
                      security threats
                    </li>
                    <li>
                      Complying with legal obligations and regulatory
                      requirements
                    </li>
                    <li>Enforcing our terms of service and other agreements</li>
                    <li>
                      Protecting the rights, property, and safety of
                      DelightDesk, our users, and others
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing and Disclosure */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                5. Data Sharing and Disclosure
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.1 Service Providers
                  </h3>
                  <p className="mb-3">
                    We share data with trusted third-party service providers who
                    assist us in operating our business:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Cloud Infrastructure:</strong> Amazon Web
                      Services, Google Cloud Platform
                    </li>
                    <li>
                      <strong>Payment Processing:</strong> Stripe, PayPal
                    </li>
                    <li>
                      <strong>Communication Services:</strong> SendGrid, Twilio
                    </li>
                    <li>
                      <strong>Analytics:</strong> Google Analytics (anonymized)
                    </li>
                    <li>
                      <strong>Security:</strong> Identity verification and fraud
                      prevention services
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.2 Legal Requirements
                  </h3>
                  <p>
                    We may disclose your information when required by law or to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Comply with legal processes, court orders, or government
                      requests
                    </li>
                    <li>Enforce our terms of service or other agreements</li>
                    <li>
                      Protect the rights, property, or safety of DelightDesk,
                      our users, or others
                    </li>
                    <li>
                      Investigate and prevent fraud, security breaches, or
                      illegal activities
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.3 Business Transfers
                  </h3>
                  <p>
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred to the acquiring entity,
                    subject to the same privacy protections.
                  </p>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.4 With Your Consent
                  </h3>
                  <p>
                    We may share your information with other parties when you
                    have given us explicit consent to do so.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                6. Data Security
              </h2>
              <div className="space-y-6">
                <p>
                  We implement enterprise-grade security measures that exceed
                  industry standards to protect your information:
                </p>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.1 Security Certifications and Compliance
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 mb-4">
                    <p className="font-medium text-purple-300 mb-2">
                      Current and In-Progress Certifications:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>SOC 2 Type II:</strong> Annual third-party
                        audits for security, availability, and confidentiality
                      </li>
                      <li>
                        <strong>ISO 27001:</strong> International standard for
                        information security management systems
                      </li>
                      <li>
                        <strong>ISO 27017:</strong> Cloud security controls and
                        implementation guidance
                      </li>
                      <li>
                        <strong>ISO 27018:</strong> Protection of personal data
                        in public cloud environments
                      </li>
                      <li>
                        <strong>GDPR Compliance:</strong> Full compliance with
                        European data protection regulations
                      </li>
                      <li>
                        <strong>CCPA/CPRA Compliance:</strong> California
                        Consumer Privacy Act compliance
                      </li>
                      <li>
                        <strong>HIPAA Ready:</strong> Healthcare data protection
                        controls and safeguards
                      </li>
                      <li>
                        <strong>FedRAMP Moderate (In Progress):</strong> Federal
                        Risk and Authorization Management Program
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.2 Advanced Technical Safeguards
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Military-Grade Encryption:</strong> AES-256
                      encryption for data at rest, TLS 1.3 for data in transit,
                      end-to-end encryption for sensitive communications
                    </li>
                    <li>
                      <strong>Zero-Trust Architecture:</strong> Never trust,
                      always verify principle with continuous authentication and
                      authorization
                    </li>
                    <li>
                      <strong>Advanced Access Controls:</strong> Multi-factor
                      authentication (MFA), single sign-on (SSO), privileged
                      access management (PAM), and just-in-time access
                    </li>
                    <li>
                      <strong>Network Security:</strong> Next-generation
                      firewalls, intrusion detection and prevention systems
                      (IDS/IPS), network segmentation, and DDoS protection
                    </li>
                    <li>
                      <strong>Endpoint Security:</strong> Advanced endpoint
                      detection and response (EDR), device compliance
                      monitoring, and mobile device management
                    </li>
                    <li>
                      <strong>Data Loss Prevention (DLP):</strong> Real-time
                      monitoring and prevention of unauthorized data access and
                      exfiltration
                    </li>
                    <li>
                      <strong>
                        Security Information and Event Management (SIEM):
                      </strong>{" "}
                      24/7 security monitoring, threat detection, and automated
                      incident response
                    </li>
                    <li>
                      <strong>Vulnerability Management:</strong> Continuous
                      vulnerability scanning, automated patching, and threat
                      intelligence integration
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.3 Infrastructure and Cloud Security
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Multi-Cloud Architecture:</strong> Redundant
                      infrastructure across multiple cloud providers (AWS,
                      Google Cloud, Azure) for high availability
                    </li>
                    <li>
                      <strong>Geographic Data Isolation:</strong> Data residency
                      controls ensuring data stays within specified geographic
                      boundaries
                    </li>
                    <li>
                      <strong>Container Security:</strong> Secure container
                      orchestration with Kubernetes, image scanning, and runtime
                      protection
                    </li>
                    <li>
                      <strong>Infrastructure as Code (IaC):</strong> Immutable
                      infrastructure with automated security configurations and
                      compliance checks
                    </li>
                    <li>
                      <strong>Backup and Recovery:</strong> Automated, encrypted
                      backups with point-in-time recovery and cross-region
                      replication
                    </li>
                    <li>
                      <strong>Business Continuity:</strong> Disaster recovery
                      plans with RTO &lt; 4 hours and RPO &lt; 1 hour for
                      critical data
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.4 Application Security
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Secure Development Lifecycle (SDLC):</strong>{" "}
                      Security integrated throughout the development process
                      from design to deployment
                    </li>
                    <li>
                      <strong>Static and Dynamic Analysis:</strong> Automated
                      code scanning for vulnerabilities, security testing, and
                      penetration testing
                    </li>
                    <li>
                      <strong>API Security:</strong> OAuth 2.0/OpenID Connect,
                      rate limiting, API gateway protection, and comprehensive
                      API security testing
                    </li>
                    <li>
                      <strong>Web Application Firewall (WAF):</strong>{" "}
                      Protection against OWASP Top 10 vulnerabilities and
                      advanced web attacks
                    </li>
                    <li>
                      <strong>Secure Coding Standards:</strong> OWASP
                      guidelines, secure coding practices, and mandatory
                      security code reviews
                    </li>
                    <li>
                      <strong>Dependency Management:</strong> Automated scanning
                      and updating of third-party dependencies for known
                      vulnerabilities
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.5 Organizational and Administrative Safeguards
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Security Governance:</strong> Chief Information
                      Security Officer (CISO) and dedicated security team with
                      defined roles and responsibilities
                    </li>
                    <li>
                      <strong>Employee Security Training:</strong> Annual
                      security awareness training, phishing simulation, and
                      role-specific security training
                    </li>
                    <li>
                      <strong>Background Checks:</strong> Comprehensive
                      background verification for all employees with access to
                      customer data
                    </li>
                    <li>
                      <strong>Incident Response:</strong> 24/7 security
                      operations center (SOC) with documented incident response
                      procedures and communication plans
                    </li>
                    <li>
                      <strong>Vendor Risk Management:</strong> Comprehensive
                      third-party risk assessment program with ongoing
                      monitoring and contractual security requirements
                    </li>
                    <li>
                      <strong>Physical Security:</strong> Biometric access
                      controls, security cameras, and 24/7 monitoring at all
                      facilities
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.6 Continuous Security Monitoring
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Security Operations Center (SOC):</strong>{" "}
                      24/7/365 security monitoring with certified security
                      analysts
                    </li>
                    <li>
                      <strong>Threat Intelligence:</strong> Integration with
                      leading threat intelligence feeds and security research
                    </li>
                    <li>
                      <strong>Behavioral Analytics:</strong> Machine
                      learning-based user and entity behavior analytics (UEBA)
                      for anomaly detection
                    </li>
                    <li>
                      <strong>Penetration Testing:</strong> Quarterly
                      penetration testing by certified third-party security
                      firms
                    </li>
                    <li>
                      <strong>Red Team Exercises:</strong> Annual adversarial
                      security testing to validate security controls
                    </li>
                    <li>
                      <strong>Bug Bounty Program:</strong> Responsible
                      disclosure program with security researchers and ethical
                      hackers
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.7 Privacy by Design
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Data Minimization:</strong> Collection and
                      processing of only necessary data with automated data
                      lifecycle management
                    </li>
                    <li>
                      <strong>Purpose Limitation:</strong> Data used only for
                      specified, explicit, and legitimate purposes
                    </li>
                    <li>
                      <strong>Pseudonymization and Anonymization:</strong>{" "}
                      Advanced techniques to protect personal data in analytics
                      and AI training
                    </li>
                    <li>
                      <strong>Privacy Impact Assessments (PIA):</strong>{" "}
                      Mandatory assessments for all new features and data
                      processing activities
                    </li>
                    <li>
                      <strong>Consent Management:</strong> Granular consent
                      controls with easy withdrawal mechanisms
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.8 Third-Party Security Validations
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Annual Security Audits:</strong> Independent
                        third-party security assessments and certifications
                      </li>
                      <li>
                        <strong>Compliance Monitoring:</strong> Continuous
                        compliance monitoring with automated reporting and
                        remediation
                      </li>
                      <li>
                        <strong>Security Ratings:</strong> Regular assessment by
                        security rating agencies (BitSight, SecurityScorecard)
                      </li>
                      <li>
                        <strong>Industry Benchmarking:</strong> Comparison
                        against industry security best practices and standards
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                7. Data Retention
              </h2>
              <div className="space-y-4">
                <p>
                  We retain your information only for as long as necessary to
                  fulfill the purposes outlined in this policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Account Data:</strong> Retained while your account
                    is active and for 90 days after account closure
                  </li>
                  <li>
                    <strong>Communication Data:</strong> Retained for up to 7
                    years for customer service and legal compliance purposes
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Anonymized and aggregated data
                    may be retained indefinitely for analytics
                  </li>
                  <li>
                    <strong>Payment Data:</strong> Retained as required by
                    applicable laws and for tax purposes (typically 7 years)
                  </li>
                  <li>
                    <strong>Legal Holds:</strong> Data subject to legal
                    proceedings will be retained until resolution
                  </li>
                </ul>
                <p className="mt-4">
                  We regularly review our data retention practices and securely
                  delete information that is no longer needed.
                </p>
              </div>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                8. International Data Transfers
              </h2>
              <div className="space-y-4">
                <p>
                  Our Services are hosted in the United States, and your
                  information may be transferred to, stored, and processed in
                  countries other than your country of residence. When we
                  transfer personal data from the EEA, UK, or other
                  jurisdictions with data localization requirements, we ensure
                  appropriate safeguards are in place:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Standard Contractual Clauses (SCCs):</strong> We use
                    EU-approved SCCs for data transfers
                  </li>
                  <li>
                    <strong>Adequacy Decisions:</strong> We rely on adequacy
                    decisions where available
                  </li>
                  <li>
                    <strong>Data Processing Agreements:</strong> We maintain
                    comprehensive DPAs with all data processors
                  </li>
                  <li>
                    <strong>Privacy Shield Successor Mechanisms:</strong> We
                    stay current with evolving international transfer mechanisms
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                9. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    9.1 Types of Cookies We Use
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Essential Cookies:</strong> Necessary for the
                      website to function properly
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Help us understand
                      how visitors interact with our website
                    </li>
                    <li>
                      <strong>Functionality Cookies:</strong> Remember your
                      preferences and personalize your experience
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements (with consent)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    9.2 Managing Cookies
                  </h3>
                  <p>You can control cookies through:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Browser settings to block or delete cookies</li>
                    <li>Our cookie consent manager (where applicable)</li>
                    <li>Opt-out mechanisms for third-party tracking</li>
                    <li>Do Not Track browser settings (where supported)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                10. Children&apos;s Privacy
              </h2>
              <div className="space-y-4">
                <p>
                  Our Services are not intended for children under the age of
                  16. We do not knowingly collect personal information from
                  children under 16. If we become aware that we have collected
                  personal information from a child under 16 without parental
                  consent, we will take steps to delete such information
                  promptly.
                </p>
                <p>
                  If you believe we have collected information from a child
                  under 16, please contact us immediately using the contact form
                  at the bottom of our homepage.
                </p>
              </div>
            </section>

            {/* Your Privacy Rights */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                11. Your Privacy Rights
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.1 General Rights
                  </h3>
                  <p>
                    You have the following rights regarding your personal
                    information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Access:</strong> Request information about the
                      personal data we hold about you
                    </li>
                    <li>
                      <strong>Rectification:</strong> Request correction of
                      inaccurate or incomplete personal data
                    </li>
                    <li>
                      <strong>Erasure:</strong> Request deletion of your
                      personal data (subject to legal requirements)
                    </li>
                    <li>
                      <strong>Portability:</strong> Receive your personal data
                      in a structured, machine-readable format
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request restriction of
                      processing your personal data
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to processing based on
                      legitimate interests
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.2 GDPR Rights (EEA/UK Residents)
                  </h3>
                  <p>
                    If you are located in the EEA or UK, you have additional
                    rights under GDPR:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Withdraw Consent:</strong> Withdraw consent for
                      processing where consent is the legal basis
                    </li>
                    <li>
                      <strong>Lodge Complaints:</strong> File complaints with
                      your local data protection authority
                    </li>
                    <li>
                      <strong>Automated Decision-Making:</strong> Opt-out of
                      solely automated decision-making processes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.3 California Privacy Rights (CCPA/CPRA)
                  </h3>
                  <p>
                    California residents have additional rights under the
                    California Consumer Privacy Act:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Know:</strong> Know what personal information is
                      collected and how it&apos;s used
                    </li>
                    <li>
                      <strong>Delete:</strong> Request deletion of personal
                      information
                    </li>
                    <li>
                      <strong>Opt-Out:</strong> Opt-out of the sale of personal
                      information (we do not sell personal information)
                    </li>
                    <li>
                      <strong>Non-Discrimination:</strong> Equal service
                      regardless of exercising privacy rights
                    </li>
                    <li>
                      <strong>Sensitive Personal Information:</strong> Limit the
                      use of sensitive personal information
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.4 How to Exercise Your Rights
                  </h3>
                  <p>To exercise any of these rights, please:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the contact form at the bottom of our homepage</li>
                    <li>
                      Use our in-platform privacy controls where available
                    </li>
                    <li>
                      Contact our Data Protection Officer (contact details
                      below)
                    </li>
                  </ul>
                  <p className="mt-3">
                    We will respond to your request within 30 days (or as
                    required by applicable law). We may need to verify your
                    identity before processing your request.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Integrations */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                12. Third-Party Integrations
              </h2>
              <div className="space-y-4">
                <p>
                  Our Services integrate with various third-party applications
                  and services. When you connect these integrations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    You authorize us to access data from these services as
                    necessary to provide our functionality
                  </li>
                  <li>
                    We may share relevant data with these services to enable the
                    integration
                  </li>
                  <li>
                    These third parties have their own privacy policies
                    governing their use of your data
                  </li>
                  <li>
                    You can revoke these integrations at any time through your
                    account settings
                  </li>
                </ul>
                <p className="mt-4">
                  We recommend reviewing the privacy policies of any third-party
                  services you integrate with our platform.
                </p>
              </div>
            </section>

            {/* Security Incident Response */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                13. Security Incident Response and Data Breach Notification
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.1 Incident Response Program
                  </h3>
                  <p className="mb-3">
                    We maintain a comprehensive incident response program that
                    includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>24/7 Security Operations Center:</strong>{" "}
                      Round-the-clock monitoring and immediate incident
                      detection
                    </li>
                    <li>
                      <strong>Incident Response Team:</strong> Dedicated team of
                      security experts with defined roles and escalation
                      procedures
                    </li>
                    <li>
                      <strong>Automated Response:</strong> Automated containment
                      and mitigation procedures for common incident types
                    </li>
                    <li>
                      <strong>Forensic Capabilities:</strong> In-house digital
                      forensics team for incident investigation and evidence
                      preservation
                    </li>
                    <li>
                      <strong>Communication Plans:</strong> Pre-defined
                      communication templates and procedures for customer and
                      regulatory notification
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.2 Data Breach Response Timeline
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Detection to Assessment:</strong> &lt; 1 hour
                        for automated detection, immediate escalation to
                        incident response team
                      </li>
                      <li>
                        <strong>Initial Containment:</strong> &lt; 4 hours to
                        contain and prevent further data exposure
                      </li>
                      <li>
                        <strong>Impact Assessment:</strong> &lt; 24 hours to
                        determine scope, affected data, and potential harm
                      </li>
                      <li>
                        <strong>Regulatory Notification:</strong> &lt; 72 hours
                        to notify relevant data protection authorities as
                        required by law
                      </li>
                      <li>
                        <strong>Customer Notification:</strong> &lt; 72 hours to
                        notify affected customers with clear, actionable
                        information
                      </li>
                      <li>
                        <strong>Public Disclosure:</strong> As required by law
                        or when in the public interest, with transparency about
                        impact and remediation
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.3 Breach Notification Content
                  </h3>
                  <p className="mb-3">
                    In the event of a data breach, we will provide you with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nature of the security incident and data involved</li>
                    <li>Likely consequences of the breach</li>
                    <li>
                      Steps we are taking to address the breach and prevent
                      future occurrences
                    </li>
                    <li>Specific actions you can take to protect yourself</li>
                    <li>
                      Contact information for further questions and support
                    </li>
                    <li>
                      Resources for credit monitoring or identity protection if
                      applicable
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.4 Post-Incident Activities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Root Cause Analysis:</strong> Comprehensive
                      investigation to identify and address underlying causes
                    </li>
                    <li>
                      <strong>Security Enhancements:</strong> Implementation of
                      additional controls to prevent similar incidents
                    </li>
                    <li>
                      <strong>Third-Party Validation:</strong> Independent
                      security assessment following significant incidents
                    </li>
                    <li>
                      <strong>Lessons Learned:</strong> Documentation and
                      sharing of insights to improve overall security posture
                    </li>
                    <li>
                      <strong>Regulatory Cooperation:</strong> Full cooperation
                      with regulatory authorities and law enforcement as
                      appropriate
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                14. Changes to This Privacy Policy
              </h2>
              <div className="space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors. When we make material changes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    We will notify you by email (to the email address specified
                    in your account)
                  </li>
                  <li>
                    We will post a notice on our website and within our platform
                  </li>
                  <li>
                    We will update the &quot;Last updated&quot; date at the top
                    of this policy
                  </li>
                  <li>
                    For significant changes, we may seek your explicit consent
                  </li>
                </ul>
                <p className="mt-4">
                  We encourage you to review this Privacy Policy periodically.
                  Your continued use of our Services after any modifications
                  indicates your acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            {/* AI and Machine Learning Data Practices */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                14. AI and Machine Learning Data Practices
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.1 AI Model Training and Data Use
                  </h3>
                  <p className="mb-3">
                    Our AI and machine learning systems are designed with
                    privacy and security at their core:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Data Anonymization:</strong> All personal data
                      used for AI training is anonymized and stripped of
                      personally identifiable information
                    </li>
                    <li>
                      <strong>Differential Privacy:</strong> We apply
                      differential privacy techniques to add statistical noise
                      that protects individual privacy
                    </li>
                    <li>
                      <strong>Federated Learning:</strong> Where possible, we
                      use federated learning approaches that keep data localized
                    </li>
                    <li>
                      <strong>Purpose Limitation:</strong> AI models are trained
                      only for the specific purposes outlined in this policy
                    </li>
                    <li>
                      <strong>Data Minimization:</strong> We use the minimum
                      amount of data necessary to achieve the desired
                      functionality
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.2 Algorithmic Transparency and Fairness
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Bias Detection:</strong> Regular testing and
                      monitoring for algorithmic bias across protected
                      characteristics
                    </li>
                    <li>
                      <strong>Fairness Metrics:</strong> Implementation of
                      fairness constraints and evaluation metrics in model
                      development
                    </li>
                    <li>
                      <strong>Explainable AI:</strong> Development of
                      interpretable models and explanation mechanisms for
                      automated decisions
                    </li>
                    <li>
                      <strong>Human Oversight:</strong> Human review processes
                      for significant automated decisions affecting users
                    </li>
                    <li>
                      <strong>Appeal Mechanisms:</strong> Procedures for users
                      to appeal or request review of automated decisions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.3 AI Ethics and Governance
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Ethics Board:</strong> Cross-functional AI ethics
                      committee overseeing responsible AI development
                    </li>
                    <li>
                      <strong>Impact Assessments:</strong> Algorithmic impact
                      assessments for all AI systems affecting user data
                    </li>
                    <li>
                      <strong>Continuous Monitoring:</strong> Ongoing monitoring
                      of AI system performance and potential adverse impacts
                    </li>
                    <li>
                      <strong>Third-Party Audits:</strong> Regular independent
                      audits of AI systems for fairness, accuracy, and privacy
                      compliance
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                15. Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    General Privacy Inquiries
                  </h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                    <p>
                      <strong>Contact Method:</strong> Please use the contact
                      form at the bottom of our homepage for all privacy-related
                      inquiries.
                    </p>
                    <p>
                      <strong>Address:</strong>
                      <br />
                      Delight Desk, Inc.
                      <br />
                      Attention: Privacy Team
                      <br />
                      2207 Prince Street
                      <br />
                      Berkeley, CA 94705
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    Data Protection Officer
                  </h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                    <p>
                      <strong>Contact Method:</strong> Please use the contact
                      form at the bottom of our homepage and specify that your
                      inquiry is for our Data Protection Officer.
                    </p>
                    <p className="text-sm mt-2 ds-text-muted">
                      Our Data Protection Officer is available to answer
                      questions about this Privacy Policy and our data
                      practices.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    EU Representative
                  </h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                    <p className="text-sm ds-text-muted">
                      If you are located in the European Union and have concerns
                      about our data practices that we cannot resolve, you may
                      contact our EU representative or your local data
                      protection authority.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                16. Governing Law and Jurisdiction
              </h2>
              <div className="space-y-4">
                <p>
                  This Privacy Policy and any disputes arising from it will be
                  governed by the laws of California, without regard to conflict
                  of law principles. Any legal action or proceeding related to
                  this Privacy Policy will be brought exclusively in the courts
                  of California.
                </p>
                <p>
                  For users located in the EU, UK, or other jurisdictions with
                  mandatory local law requirements, this section does not
                  override your statutory rights under applicable data
                  protection laws.
                </p>
              </div>
            </section>

            {/* Final Notes */}
            <section className="border-t border-purple-500/20 pt-8">
              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
                <p className="text-center text-sm ds-text-muted">
                  This Privacy Policy is effective as of the last updated date
                  shown above. We are committed to protecting your privacy and
                  will continue to update our practices to meet the highest
                  standards of data protection.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivaPolicy;
