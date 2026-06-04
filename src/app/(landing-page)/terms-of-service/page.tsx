import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TermsOfService = () => {
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
            <h1 className="ds-heading-xl font-bold mb-4">Terms of Service</h1>
            <p className="ds-body-lg ds-text-muted">
              Last updated: August 22, 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 ds-body-md ds-text-secondary leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                1. Agreement and Acceptance
              </h2>
              <div className="space-y-4">
                <p>
                  These Terms of Service (&quot;Terms&quot;,
                  &quot;Agreement&quot;) constitute a legally binding agreement
                  between you (&quot;Customer&quot;, &quot;User&quot;,
                  &quot;you&quot;) and DelightDesk, Inc.
                  (&quot;DelightDesk&quot;, &quot;Company&quot;, &quot;we&quot;,
                  &quot;us&quot;, &quot;our&quot;) governing your access to and
                  use of the DelightDesk platform and related services (the
                  &quot;Services&quot;).
                </p>
                <p>
                  By accessing, using, or clicking to accept or agree to these
                  Terms through any means, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and our
                  Privacy Policy, which is incorporated herein by reference. If
                  you do not agree to these Terms, you may not access or use our
                  Services.
                </p>
                <p className="font-medium text-purple-300">
                  If you are entering into this Agreement on behalf of a
                  company, organization, or other legal entity, you represent
                  and warrant that you have the authority to bind such entity to
                  these Terms.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                2. Service Description and Scope
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.1 Platform Overview
                  </h3>
                  <p className="mb-3">
                    DelightDesk provides an enterprise-grade cloud-based
                    customer service automation platform featuring:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>AI-Powered Support Automation:</strong> Advanced
                      machine learning algorithms for customer inquiry
                      classification, routing, and automated response generation
                    </li>
                    <li>
                      <strong>Multi-Channel Integration:</strong> Seamless
                      integration with email providers, live chat systems,
                      social media platforms, and helpdesk solutions
                    </li>
                    <li>
                      <strong>E-commerce Platform Connectivity:</strong> Native
                      integrations with Shopify, WooCommerce, Magento, and other
                      major e-commerce platforms
                    </li>
                    <li>
                      <strong>Customer Data Management:</strong> Comprehensive
                      customer profile management, order lookup, and interaction
                      history tracking
                    </li>
                    <li>
                      <strong>Analytics and Reporting:</strong> Real-time
                      dashboards, performance metrics, and business intelligence
                      tools
                    </li>
                    <li>
                      <strong>Workflow Automation:</strong> Customizable
                      business rules, escalation procedures, and automated task
                      management
                    </li>
                    <li>
                      <strong>API Access:</strong> RESTful APIs for custom
                      integrations and third-party application connectivity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.2 Service Levels and Availability
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Uptime Commitment:</strong> 99.9% uptime service
                      level agreement (SLA) with planned maintenance
                      notifications
                    </li>
                    <li>
                      <strong>Performance Standards:</strong> Sub-second
                      response times for API calls and real-time data processing
                    </li>
                    <li>
                      <strong>Geographic Availability:</strong> Services
                      available globally with data residency controls for
                      compliance
                    </li>
                    <li>
                      <strong>Scalability:</strong> Auto-scaling infrastructure
                      to handle varying workloads and usage patterns
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    2.3 Service Updates and Modifications
                  </h3>
                  <p>We continuously improve our Services and may:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Add new features and functionality with appropriate user
                      notification
                    </li>
                    <li>
                      Modify existing features based on user feedback and
                      technical requirements
                    </li>
                    <li>
                      Deprecated features will receive 90 days advance notice
                      with migration support
                    </li>
                    <li>
                      Emergency changes for security or legal compliance may be
                      implemented immediately
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Obligations and Responsibilities */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                3. User Obligations and Responsibilities
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    3.1 Account Management
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Account Information:</strong> Provide accurate,
                      current, and complete information during registration and
                      maintain its accuracy
                    </li>
                    <li>
                      <strong>Security:</strong> Maintain the confidentiality of
                      account credentials, enable multi-factor authentication,
                      and promptly notify us of any security breaches
                    </li>
                    <li>
                      <strong>Authorized Use:</strong> Ensure all users within
                      your organization comply with these Terms and your
                      internal access policies
                    </li>
                    <li>
                      <strong>Monitoring:</strong> Monitor your account activity
                      and promptly report any unauthorized access or suspicious
                      activity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    3.2 Acceptable Use Policy
                  </h3>
                  <p className="mb-3">
                    You agree to use our Services only for lawful purposes and
                    in accordance with these Terms. You will not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Legal Compliance:</strong> Violate any applicable
                      laws, regulations, or third-party rights
                    </li>
                    <li>
                      <strong>System Integrity:</strong> Attempt to disrupt,
                      compromise, or gain unauthorized access to our systems or
                      networks
                    </li>
                    <li>
                      <strong>Malicious Activities:</strong> Upload malware,
                      viruses, or engage in any form of cyber attack
                    </li>
                    <li>
                      <strong>Intellectual Property:</strong> Infringe upon our
                      intellectual property rights or those of third parties
                    </li>
                    <li>
                      <strong>Reverse Engineering:</strong> Reverse engineer,
                      decompile, or attempt to extract source code from our
                      Services
                    </li>
                    <li>
                      <strong>Competitive Intelligence:</strong> Use our
                      Services to develop competing products or services
                    </li>
                    <li>
                      <strong>Excessive Usage:</strong> Exceed reasonable usage
                      limits or engage in activities that degrade service
                      performance
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    3.3 Data and Content Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Data Accuracy:</strong> Ensure all data uploaded
                      to our platform is accurate and legally obtained
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> Comply with all
                      applicable data protection laws (GDPR, CCPA, etc.) for
                      your customer data
                    </li>
                    <li>
                      <strong>Content Ownership:</strong> Retain ownership and
                      responsibility for all content and data you provide
                    </li>
                    <li>
                      <strong>Prohibited Content:</strong> Not upload illegal,
                      harmful, defamatory, or inappropriate content
                    </li>
                    <li>
                      <strong>Backup Responsibility:</strong> Maintain
                      independent backups of critical data as we provide service
                      availability, not data recovery guarantees
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Terms and Billing */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                4. Payment Terms and Billing
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.1 Pricing and Payment Structure
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Subscription Fees:</strong> Monthly or annual
                      subscription fees based on your selected plan, billed in
                      advance
                    </li>
                    <li>
                      <strong>Payment Methods:</strong> We accept major credit
                      cards, ACH transfers, and wire transfers for enterprise
                      customers
                    </li>
                    <li>
                      <strong>Currency:</strong> All fees are quoted and charged
                      in US Dollars unless otherwise specified
                    </li>
                    <li>
                      <strong>Taxes:</strong> Fees are exclusive of all
                      applicable taxes, which are your responsibility
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.2 Billing and Collection
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Billing Cycle:</strong> Subscription fees are
                      billed monthly in advance via credit card
                    </li>
                    <li>
                      <strong>Payment Terms:</strong> Payment is due immediately
                      for credit card payments
                    </li>
                    <li>
                      <strong>Late Payments:</strong> Late payment fees of 1.5%
                      per month may apply to overdue amounts
                    </li>
                    <li>
                      <strong>Failed Payments:</strong> Service may be suspended
                      after 10 days of failed payment, with full termination
                      after 30 days
                    </li>
                    <li>
                      <strong>Disputed Charges:</strong> Billing disputes must
                      be raised within 60 days of the invoice date
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    4.3 Price Changes and Refunds
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Price Changes:</strong> We may modify pricing with
                      60 days written notice, with changes taking effect at your
                      next renewal
                    </li>
                    <li>
                      <strong>Grandfathering:</strong> Existing customers may be
                      grandfathered into current pricing for up to 12 months
                    </li>
                    <li>
                      <strong>Refund Policy:</strong> Subscription fees are
                      non-refundable except as required by applicable law or our
                      SLA commitments
                    </li>
                    <li>
                      <strong>Service Credits:</strong> SLA violations may
                      result in service credits applied to your next invoice
                    </li>
                    <li>
                      <strong>Cancellation:</strong> You may cancel at any time
                      with services continuing until the end of your current
                      billing period
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Processing and Privacy */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                5. Data Processing and Privacy
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.1 Data Ownership and Control
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Customer Data Ownership:</strong> You retain full
                      ownership and control of all customer data processed
                      through our platform
                    </li>
                    <li>
                      <strong>Data Portability:</strong> You may export your
                      data in standard formats at any time during the term of
                      service
                    </li>
                    <li>
                      <strong>Data Deletion:</strong> Upon termination, customer
                      data will be securely deleted within 30 days unless
                      legally required to retain
                    </li>
                    <li>
                      <strong>Data Location:</strong> Customer data is processed
                      and stored in compliance with your specified geographic
                      requirements
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.2 Data Processing Agreement
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>GDPR Compliance:</strong> We act as a data
                      processor under GDPR and will execute a Data Processing
                      Agreement (DPA) upon request
                    </li>
                    <li>
                      <strong>Standard Contractual Clauses:</strong>{" "}
                      International data transfers are governed by EU-approved
                      Standard Contractual Clauses
                    </li>
                    <li>
                      <strong>Subprocessors:</strong> We maintain a current list
                      of approved subprocessors with appropriate contractual
                      safeguards
                    </li>
                    <li>
                      <strong>Data Subject Rights:</strong> We will assist you
                      in responding to data subject requests as required by
                      applicable law
                    </li>
                    <li>
                      <strong>Security Obligations:</strong> We implement
                      appropriate technical and organizational measures as
                      outlined in our Privacy Policy
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    5.3 AI and Machine Learning
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Model Training:</strong> We may use anonymized and
                      aggregated data to improve our AI models with appropriate
                      privacy safeguards
                    </li>
                    <li>
                      <strong>Algorithmic Transparency:</strong> We provide
                      documentation on how our AI systems process and classify
                      customer data
                    </li>
                    <li>
                      <strong>Human Oversight:</strong> Critical decisions
                      affecting customer data include human review mechanisms
                    </li>
                    <li>
                      <strong>Bias Prevention:</strong> We regularly audit our
                      AI systems for bias and implement fairness constraints
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Service Level Agreement */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                6. Service Level Agreement and Support
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.1 Availability and Performance
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 mb-4">
                    <p className="font-medium text-purple-300 mb-2">
                      Service Level Commitments:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Uptime SLA:</strong> 99.9% monthly uptime
                        (excluding scheduled maintenance)
                      </li>
                      <li>
                        <strong>Response Time:</strong> API responses within
                        200ms for 95% of requests
                      </li>
                      <li>
                        <strong>Data Processing:</strong> Real-time data
                        processing with sub-second latency
                      </li>
                      <li>
                        <strong>Scheduled Maintenance:</strong> Maximum 4 hours
                        per month with 72-hour advance notice
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.2 Customer Support
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Support Channels:</strong> 24/7 support via
                      in-platform chat, email, and phone for enterprise
                      customers
                    </li>
                    <li>
                      <strong>Response Times:</strong> Critical issues within 1
                      hour, standard issues within 4 hours
                    </li>
                    <li>
                      <strong>Technical Support:</strong> Dedicated technical
                      account managers for enterprise customers
                    </li>
                    <li>
                      <strong>Training and Onboarding:</strong> Comprehensive
                      training programs and documentation
                    </li>
                    <li>
                      <strong>Status Page:</strong> Real-time service status
                      updates and incident communications
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    6.3 Service Credits and Remedies
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>SLA Violations:</strong> Service credits of 10% of
                      monthly fees for each 0.1% below 99.9% uptime
                    </li>
                    <li>
                      <strong>Credit Calculation:</strong> Credits calculated
                      monthly and applied to subsequent invoices
                    </li>
                    <li>
                      <strong>Maximum Credits:</strong> Total service credits
                      will not exceed 50% of monthly subscription fees
                    </li>
                    <li>
                      <strong>Credit Claims:</strong> Must be claimed within 30
                      days of the end of the affected month
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                7. Intellectual Property Rights
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    7.1 Our Intellectual Property
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Platform Ownership:</strong> We retain all rights,
                      title, and interest in the DelightDesk platform, software,
                      and related technology
                    </li>
                    <li>
                      <strong>Trademarks:</strong> DelightDesk and related marks
                      are our exclusive trademarks and may not be used without
                      permission
                    </li>
                    <li>
                      <strong>AI Models:</strong> Our proprietary AI algorithms,
                      models, and training data remain our confidential
                      information
                    </li>
                    <li>
                      <strong>Improvements:</strong> Any improvements or
                      modifications to our platform based on your feedback
                      become our property
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    7.2 Your Intellectual Property
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Customer Content:</strong> You retain ownership of
                      all data, content, and materials you provide
                    </li>
                    <li>
                      <strong>Limited License:</strong> You grant us a limited
                      license to process your data solely to provide our
                      Services
                    </li>
                    <li>
                      <strong>Trademark Usage:</strong> Any use of your
                      trademarks requires your explicit written consent
                    </li>
                    <li>
                      <strong>Confidential Information:</strong> We will
                      maintain the confidentiality of your proprietary
                      information
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    7.3 Third-Party Rights
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Open Source Software:</strong> Our platform may
                      include open source components governed by their
                      respective licenses
                    </li>
                    <li>
                      <strong>Third-Party Integrations:</strong> Integration
                      with third-party services is subject to their terms and
                      conditions
                    </li>
                    <li>
                      <strong>Indemnification:</strong> We will defend against
                      claims that our Services infringe third-party intellectual
                      property rights
                    </li>
                    <li>
                      <strong>DMCA Compliance:</strong> We respond to valid DMCA
                      notices and maintain a repeat infringer policy
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Security and Compliance */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                8. Security and Compliance
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    8.1 Security Measures
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Encryption:</strong> AES-256 encryption for data
                      at rest and TLS 1.3 for data in transit
                    </li>
                    <li>
                      <strong>Access Controls:</strong> Multi-factor
                      authentication, role-based access controls, and privileged
                      access management
                    </li>
                    <li>
                      <strong>Network Security:</strong> Advanced firewalls,
                      intrusion detection, and DDoS protection
                    </li>
                    <li>
                      <strong>Security Monitoring:</strong> 24/7 security
                      operations center with automated threat detection
                    </li>
                    <li>
                      <strong>Incident Response:</strong> Documented incident
                      response procedures with customer notification protocols
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    8.2 Compliance Frameworks
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>SOC 2 Type II:</strong> Annual compliance audits
                        for security, availability, and confidentiality
                      </li>
                      <li>
                        <strong>ISO 27001:</strong> Information security
                        management system certification
                      </li>
                      <li>
                        <strong>GDPR:</strong> Full compliance with European
                        data protection regulations
                      </li>
                      <li>
                        <strong>CCPA:</strong> California Consumer Privacy Act
                        compliance
                      </li>
                      <li>
                        <strong>HIPAA Ready:</strong> Healthcare data protection
                        controls for applicable customers
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    8.3 Audit and Compliance Support
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Compliance Documentation:</strong> We provide
                      documentation to support your compliance audits
                    </li>
                    <li>
                      <strong>Security Questionnaires:</strong> We complete
                      standard security questionnaires for enterprise customers
                    </li>
                    <li>
                      <strong>Penetration Testing:</strong> Regular third-party
                      penetration testing with results available upon request
                    </li>
                    <li>
                      <strong>Compliance Reporting:</strong> Regular compliance
                      reports and attestations
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Warranties and Disclaimers */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                9. Warranties and Disclaimers
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    9.1 Service Warranties
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Performance:</strong> We warrant that our Services
                      will perform substantially in accordance with our
                      documentation
                    </li>
                    <li>
                      <strong>Security:</strong> We warrant that we maintain
                      appropriate security measures as described in our Privacy
                      Policy
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> We warrant that our
                      Services comply with applicable laws and regulations
                    </li>
                    <li>
                      <strong>Availability:</strong> We warrant service
                      availability in accordance with our published SLA
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    9.2 Mutual Representations
                  </h3>
                  <p className="mb-3">
                    Each party represents and warrants that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      It has full corporate power and authority to enter into
                      this Agreement
                    </li>
                    <li>
                      The execution of this Agreement has been duly authorized
                    </li>
                    <li>
                      This Agreement constitutes a legal, valid, and binding
                      obligation
                    </li>
                    <li>
                      Its performance will not violate any applicable laws or
                      agreements
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    9.3 Disclaimers
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-sm mb-2 uppercase font-medium text-purple-300">
                      EXCEPT AS EXPRESSLY SET FORTH HEREIN:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                      <li>
                        THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                        AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND
                      </li>
                      <li>
                        WE DISCLAIM ALL IMPLIED WARRANTIES INCLUDING
                        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                        NON-INFRINGEMENT
                      </li>
                      <li>
                        WE DO NOT WARRANT THAT THE SERVICES WILL BE
                        UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE
                      </li>
                      <li>
                        YOU ASSUME FULL RESPONSIBILITY FOR THE RESULTS OBTAINED
                        FROM USE OF THE SERVICES
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                10. Limitation of Liability and Indemnification
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    10.1 Liability Limitations
                  </h3>
                  <div className="bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 mb-4">
                    <p className="text-sm mb-2 uppercase font-medium text-purple-300">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                      <li>
                        OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY
                        YOU IN THE 12 MONTHS PRECEDING THE CLAIM
                      </li>
                      <li>
                        WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
                        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
                      </li>
                      <li>
                        WE SHALL NOT BE LIABLE FOR LOST PROFITS, LOSS OF DATA,
                        OR BUSINESS INTERRUPTION
                      </li>
                      <li>
                        THESE LIMITATIONS APPLY REGARDLESS OF THE THEORY OF
                        LIABILITY
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    10.2 Exceptions to Liability Limitations
                  </h3>
                  <p className="mb-3">The above limitations do not apply to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Death or personal injury caused by our negligence</li>
                    <li>
                      Fraud, fraudulent misrepresentation, or willful misconduct
                    </li>
                    <li>Violation of intellectual property rights</li>
                    <li>Breach of confidentiality obligations</li>
                    <li>Indemnification obligations set forth herein</li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    10.3 Mutual Indemnification
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Our Indemnification:</strong> We will defend and
                      indemnify you against claims that our Services infringe
                      third-party intellectual property rights
                    </li>
                    <li>
                      <strong>Your Indemnification:</strong> You will defend and
                      indemnify us against claims arising from your use of the
                      Services, your data, or violation of these Terms
                    </li>
                    <li>
                      <strong>Process:</strong> The indemnifying party will
                      control the defense and settlement of claims
                    </li>
                    <li>
                      <strong>Cooperation:</strong> The indemnified party will
                      reasonably cooperate in the defense of claims
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                11. Termination and Suspension
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.1 Termination Rights
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>By You:</strong> You may terminate this Agreement
                      at any time with or without cause by providing written
                      notice
                    </li>
                    <li>
                      <strong>By Us:</strong> We may terminate for material
                      breach that remains uncured for 30 days after written
                      notice
                    </li>
                    <li>
                      <strong>Immediate Termination:</strong> Either party may
                      terminate immediately for bankruptcy, insolvency, or
                      assignment for creditors
                    </li>
                    <li>
                      <strong>Convenience:</strong> We may terminate for
                      convenience with 90 days written notice
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.2 Suspension Rights
                  </h3>
                  <p className="mb-3">
                    We may suspend your access to the Services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Non-Payment:</strong> For non-payment of fees
                      after 10 days written notice
                    </li>
                    <li>
                      <strong>Security Risk:</strong> Immediately if your
                      account poses a security risk to our systems or other
                      customers
                    </li>
                    <li>
                      <strong>Legal Violation:</strong> If your use violates
                      applicable laws or these Terms
                    </li>
                    <li>
                      <strong>Emergency:</strong> During emergency maintenance
                      or security incidents
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    11.3 Effects of Termination
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Service Access:</strong> Your access to the
                      Services will cease immediately upon termination
                    </li>
                    <li>
                      <strong>Data Retention:</strong> We will retain your data
                      for 30 days to allow for data export, then securely delete
                      all data
                    </li>
                    <li>
                      <strong>Payment Obligations:</strong> All unpaid fees
                      become immediately due and payable
                    </li>
                    <li>
                      <strong>Survival:</strong> Sections relating to payment,
                      confidentiality, indemnification, and limitation of
                      liability survive termination
                    </li>
                    <li>
                      <strong>Return of Materials:</strong> Each party will
                      return or destroy confidential information of the other
                      party
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                12. Dispute Resolution and Governing Law
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    12.1 Informal Dispute Resolution
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Good Faith Negotiation:</strong> Before initiating
                      formal proceedings, parties agree to negotiate in good
                      faith for 60 days
                    </li>
                    <li>
                      <strong>Executive Escalation:</strong> If initial
                      negotiations fail, disputes will be escalated to senior
                      executives
                    </li>
                    <li>
                      <strong>Continued Service:</strong> Services will continue
                      during dispute resolution unless terminated for other
                      reasons
                    </li>
                    <li>
                      <strong>Confidentiality:</strong> All dispute resolution
                      communications remain confidential
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    12.2 Binding Arbitration
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Arbitration Agreement:</strong> Disputes that
                      cannot be resolved informally will be resolved through
                      binding arbitration
                    </li>
                    <li>
                      <strong>Rules:</strong> Arbitration will be conducted
                      under the Commercial Arbitration Rules of the American
                      Arbitration Association
                    </li>
                    <li>
                      <strong>Location:</strong> Arbitration will take place in
                      [Your City, State] or via videoconference by mutual
                      agreement
                    </li>
                    <li>
                      <strong>Class Action Waiver:</strong> You waive the right
                      to participate in class action lawsuits or class-wide
                      arbitration
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    12.3 Governing Law and Jurisdiction
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Governing Law:</strong> This Agreement is governed
                      by the laws of [Your State], without regard to conflict of
                      law principles
                    </li>
                    <li>
                      <strong>Federal Court Jurisdiction:</strong> Any
                      litigation will be subject to the exclusive jurisdiction
                      of federal courts in [Your Jurisdiction]
                    </li>
                    <li>
                      <strong>Injunctive Relief:</strong> Either party may seek
                      injunctive relief in court for violations of intellectual
                      property or confidentiality
                    </li>
                    <li>
                      <strong>International Customers:</strong> For customers
                      outside the US, local mandatory consumer protection laws
                      may apply
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* General Provisions */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                13. General Provisions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.1 Force Majeure
                  </h3>
                  <p>
                    Neither party will be liable for delays or failures due to
                    events beyond their reasonable control, including natural
                    disasters, war, terrorism, pandemic, government actions, or
                    internet/telecommunications failures. The affected party
                    must promptly notify the other party and use reasonable
                    efforts to mitigate the impact.
                  </p>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.2 Assignment and Transfer
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Our Rights:</strong> We may assign this Agreement
                      in connection with a merger, acquisition, or sale of
                      assets
                    </li>
                    <li>
                      <strong>Your Rights:</strong> You may not assign this
                      Agreement without our prior written consent
                    </li>
                    <li>
                      <strong>Successors:</strong> This Agreement binds and
                      benefits the parties&apos; successors and permitted
                      assigns
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.3 Modifications and Amendments
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Term Updates:</strong> We may modify these Terms
                      with 30 days advance notice for material changes
                    </li>
                    <li>
                      <strong>Acceptance:</strong> Continued use of Services
                      after modification constitutes acceptance
                    </li>
                    <li>
                      <strong>Enterprise Customers:</strong> Material changes
                      affecting enterprise customers require 60 days notice
                    </li>
                    <li>
                      <strong>Written Agreement:</strong> Modifications must be
                      in writing and signed by both parties for enterprise
                      agreements
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    13.4 Entire Agreement and Severability
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Complete Agreement:</strong> These Terms
                      constitute the entire agreement and supersede all prior
                      agreements
                    </li>
                    <li>
                      <strong>Order of Precedence:</strong> In case of conflict,
                      the order is: signed enterprise agreement, these Terms,
                      Privacy Policy
                    </li>
                    <li>
                      <strong>Severability:</strong> If any provision is
                      invalid, the remainder of the Agreement remains in effect
                    </li>
                    <li>
                      <strong>Headings:</strong> Section headings are for
                      convenience only and do not affect interpretation
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="ds-heading-lg font-semibold mb-6 ds-text-primary">
                14. Contact Information and Legal Notices
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.1 General Inquiries
                  </h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                    <p>
                      <strong>Contact Method:</strong> Please use the contact
                      form at the bottom of our homepage for all inquiries
                      regarding these Terms of Service.
                    </p>
                    <p>
                      <strong>Response Time:</strong> We will respond to all
                      inquiries within 2 business days.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.2 Legal Notices
                  </h3>
                  <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                    <p>
                      <strong>Company Address:</strong>
                      <br />
                      Delight Desk, Inc.
                      <br />
                      Attention: Legal Department
                      <br />
                      2207 Prince Street
                      <br />
                      Berkeley, CA 94705
                    </p>
                    <p className="mt-4">
                      <strong>Legal Notices:</strong> All legal notices must be
                      sent via certified mail to the address above or through
                      the contact form with &quot;Legal Notice&quot; specified.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="ds-heading-md font-medium mb-3 ds-text-primary">
                    14.3 Compliance and Regulatory
                  </h3>
                  <p>
                    For compliance-related inquiries, data protection requests,
                    or regulatory matters, please use the contact form and
                    specify the nature of your inquiry. Our compliance team will
                    respond within 1 business day.
                  </p>
                </div>
              </div>
            </section>

            {/* Effective Date */}
            <section className="border-t border-purple-500/20 pt-8">
              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
                <p className="text-center text-sm ds-text-muted">
                  These Terms of Service are effective as of the last updated
                  date shown above and supersede all previous versions. By
                  continuing to use our Services, you acknowledge and agree to
                  be bound by these Terms.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
