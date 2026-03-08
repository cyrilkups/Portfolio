import { IProject, IExperience } from '@/types';

export const GENERAL_INFO = {
    email: 'cyrilkups95@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Cyril, I am reaching out to you because...',

    oldPortfolio: 'https://www.legacy.me.toinfinite.dev',
    upworkProfile: 'https://www.upwork.com/freelancers/cyrilkups',
};

export const SOCIAL_LINKS = [
    { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com/cyrilkups' },
    {
        name: 'LinkedIn',
        icon: 'mdi:linkedin',
        url: 'https://www.linkedin.com/in/cyril-kups',
    },
    {
        name: 'Instagram',
        icon: 'mdi:instagram',
        url: 'https://www.instagram.com/cyril_kups/',
    },
    { name: 'X', icon: 'mdi:twitter', url: 'https://x.com/cyrilkups?s=21' },
];

export const MY_STACK = {
    frontend: [
        { name: 'React', icon: 'logos:react' },
        { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
        { name: 'Sass', icon: 'logos:sass' },
        { name: 'Bootstrap', icon: 'logos:bootstrap' },
    ],
    backend: [
        { name: 'Python', icon: 'logos:python' },
        { name: 'TypeScript', icon: 'logos:typescript-icon' },
        { name: 'JavaScript', icon: 'logos:javascript' },
        { name: 'Node.js', icon: 'logos:nodejs-icon' },
        { name: 'Java', icon: 'logos:java' },
        { name: 'Kotlin', icon: 'logos:kotlin-icon' },
    ],
    database: [
        { name: 'PostgreSQL', icon: 'logos:postgresql' },
        { name: 'MongoDB', icon: 'logos:mongodb-icon' },
        { name: 'Pandas', icon: 'logos:pandas' },
        { name: 'NumPy', icon: 'logos:numpy' },
    ],
    tools: [
        { name: 'Claude AI', icon: 'simple-icons:anthropic' },
        { name: 'Amazon Q Developer', icon: 'logos:aws' },
        { name: 'GitHub Copilot', icon: 'logos:github-copilot' },
        { name: 'Kafka', icon: 'logos:kafka-icon' },
        { name: 'Bash', icon: 'logos:bash-icon' },
        { name: 'Figma', icon: 'logos:figma' },
        { name: 'Jira', icon: 'logos:jira' },
        { name: 'AWS', icon: 'logos:aws' },
        { name: 'Cloudflare', icon: 'logos:cloudflare-icon' },
        { name: 'SketchUp', icon: 'simple-icons:sketchup' },
        { name: 'Enscape', icon: '/logo/enscape.png', isImage: true },
    ],
    concepts: [
        { name: 'Parallel Computing' },
        { name: 'Microservices' },
        { name: 'Full-Stack Development' },
        { name: 'Web Development' },
        { name: 'Mobile Development' },
        { name: 'Agile Methodologies' },
        { name: 'Product Management' },
        { name: 'Product Strategy' },
    ],
};

export const PRODUCTS_WORKED_ON = [
    {
        name: 'Campus Hustle',
        logo: '/logo/App Logo/Campus Hustle App Logo.png',
        url: 'https://www.campus-hustle.com/',
    },
    {
        name: 'Georim',
        logo: '/logo/App Logo/Georim App Logo.png',
        url: 'https://www.eventsatgeorim.com/',
    },
    {
        name: 'DocLink',
        logo: '/logo/App Logo/DocLink App Logo.png',
        url: 'https://doclink1.onrender.com/',
    },
];

export const PROJECTS: IProject[] = [
    {
        title: 'Campus Hustle',
        slug: 'campus-hustle',
        liveUrl: 'https://www.campus-hustle.com/',
        year: 2024,
        description: `      Campus Hustle is a student-run marketplace platform I co-founded to help student entrepreneurs launch, manage, and grow their businesses directly on campus. The platform connects buyers and sellers through storefronts, event listings, campus-wide discovery, and real-time communication channels - all optimized for student speed, trust, and mobility.<br/><br/>
      
      <strong>Key Features:</strong><br/>
      <ul>
        <li>🏪 <strong>Instant Shop Creation:</strong> Students launch storefronts in under 2 minutes</li>
        <li>💬 <strong>Shop Chat Channels:</strong> Built-in messaging to build trust + close orders faster</li>
        <li>🔄 <strong>Distributed Event Pipeline:</strong> Real-time order + notification routing via Kafka</li>
        <li>🛍️ <strong>Multi-Category Listings:</strong> Goods, digital services, pop-up events, and more</li>
        <li>📱 <strong>Mobile-First Experience:</strong> Designed for quick transactions between classes</li>
        <li>🔐 <strong>Smart Risk + Access Controls:</strong> Rate-limiting + secure session verification</li>
      </ul><br/>
      
      <strong>Technical Highlights:</strong><br/>
      <ul>
        <li><strong>Event-Driven Architecture:</strong> Designed a Kafka-based microservice pipeline that processes 10K+ asynchronous events per week</li>
        <li><strong>High-Reliability Cloud Deployment:</strong> Built on AWS with VPC isolation, autoscaling groups, IAM policy controls, and Cloudflare edge routing</li>
        <li><strong>Database Performance Optimization:</strong> Indexed PostgreSQL schema + efficient query patterns for fast product and vendor search</li>
        <li><strong>Resilience & Security:</strong> Achieved 99.98% uptime, with fallback failover logic and proactive monitoring</li>
        <li><strong>Latency Optimization:</strong> Cloudflare CDN delivery and request caching improved load speeds by 30% campus-wide</li>
      </ul>
      `,
        role: `
      <strong>Co-Founder • Technical Product Manager • Full-Stack Engineer</strong><br/>
      From strategy → architecture → rollout, I owned:<br/><br/>
      
      <strong>Product Strategy:</strong><br/>
      <ul>
        <li>Conducted user discovery interviews with 40+ student sellers</li>
        <li>Defined core feature launch priorities</li>
      </ul>
      
      <strong>System Architecture:</strong><br/>
      <ul>
        <li>Designed distributed architecture for reliability, load distribution, and real-time updates</li>
      </ul>
      
      <strong>Backend Engineering:</strong><br/>
      <ul>
        <li>Implemented Kotlin services, API Gateway, event streaming, and PostgreSQL data models</li>
      </ul>
      
      <strong>Frontend Experience:</strong><br/>
      <ul>
        <li>Built seller dashboards, product flows, and messaging UI in React + Tailwind</li>
      </ul>
      
      <strong>DevOps & Deployment:</strong><br/>
      <ul>
        <li>Set up AWS infrastructure, SSL routing, CI/CD pipelines, and uptime monitoring</li>
      </ul>
      
      <strong>Partnership & Growth:</strong><br/>
      <ul>
        <li>Secured university support, organized campus rollout, managed merchant onboarding</li>
      </ul>
      `,
        caseStudy: `
      <strong>Problem:</strong> Student entrepreneurs lacked a central platform to sell on campus — transactions happened through DMs, group chats, and word-of-mouth, making discovery, reliability, and follow-through inconsistent.<br/><br/>
      
      <strong>Solution:</strong> Built a trusted, real-time marketplace that standardizes storefront visibility, communication, and campus-wide discovery — optimized for the pace of student life.<br/><br/>
      
      <strong>Outcome:</strong><br/>
      <ul>
        <li>✅ Onboarded 100+ entrepreneurs across 3 campuses</li>
        <li>✅ Facilitated 300+ verified buyer transactions and interactions</li>
        <li>✅ Secured $10K in grant funding + institutional backing</li>
        <li>✅ Recognized in pitch competitions and innovation showcases</li>
      </ul>
      `,
        techStack: [
            'Kotlin',
            'React',
            'PostgreSQL',
            'Kafka',
            'AWS',
            'Cloudflare',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/campus-hustle.png',
        longThumbnail: '/projects/long/campus-hustle.png',
        images: ['/projects/images/campus-hustle.png'],
    },
    {
        title: 'QuickReach',
        slug: 'quick-reach',
        year: 2026,
        techStack: [
            'Swift',
            'SwiftUI',
            'Combine',
            'MultipeerConnectivity',
            'MVVM',
        ],
        description: `QuickReach is an offline peer-to-peer messaging application that enables automatic discovery and real-time communication between nearby iOS and macOS devices without requiring internet connectivity or WiFi infrastructure. Designed with an iMessage-inspired interface, the app leverages Apple's native MultipeerConnectivity framework to create a mesh network of connected devices.<br/><br/>
        
        <strong>Key Features:</strong><br/>
        <ul>
            <li>🔍 <strong>Auto-Discovery & Connection:</strong> Automatically detects and connects to nearby devices with zero manual setup</li>
            <li>📵 <strong>Offline-First Architecture:</strong> Complete functionality without internet; perfect for conferences, classrooms, and areas with poor connectivity</li>
            <li>⚡ <strong>Real-time Messaging:</strong> Send/receive messages instantly with delivery status tracking (sent/delivered/failed)</li>
            <li>💬 <strong>Broadcast & 1:1 Chat:</strong> Switch between group messaging and private conversations</li>
            <li>🎨 <strong>iMessage-Style UI:</strong> Modern bubble interface with message status indicators and timestamps</li>
            <li>🔄 <strong>Message Retry Logic:</strong> Automatic retry mechanism (3 attempts) for failed message delivery</li>
            <li>🔒 <strong>Encrypted Communication:</strong> Mandatory MCSession encryption for all peer-to-peer connections</li>
            <li>👥 <strong>Peer Management:</strong> View connected peers, connection states, and real-time availability</li>
        </ul>
        `,
        role: `
        <strong>Founder • Lead Architect • Full-Stack Engineer</strong><br/><br/>
        
        <strong>Product & UX</strong><br/>
        <ul>
            <li>Conducted user research with 15+ students and professionals to identify offline communication needs in dense environments</li>
            <li>Defined MVP focused on automatic peer discovery and simple messaging</li>
            <li>Designed an iMessage-inspired UI for familiarity and ease of use</li>
            <li>Performed competitive analysis to identify gaps in existing P2P solutions</li>
        </ul>
        
        <strong>System Architecture</strong><br/>
        <ul>
            <li>Architected a MultipeerConnectivity-based P2P mesh network with automatic discovery and session management</li>
            <li>Built a reactive state architecture using Combine for real-time peer synchronization</li>
            <li>Designed end-to-end message flow from creation to UI rendering</li>
            <li>Implemented connection handling, retries, and graceful disconnection logic</li>
        </ul>
        
        <strong>Engineering</strong><br/>
        <ul>
            <li>Developed a centralized MultipeerManager to manage sessions, advertising, and browsing</li>
            <li>Implemented Codable-based message serialization with error handling</li>
            <li>Managed concurrency and UI updates with safe main-thread dispatch</li>
            <li>Added structured logging using os.log for debugging and production monitoring</li>
        </ul>
        
        <strong>Frontend</strong><br/>
        <ul>
            <li>Built a SwiftUI chat interface with auto-scrolling, input validation, and send state management</li>
            <li>Designed reusable message bubbles with sent/received states and timestamps</li>
            <li>Created connection and peer status views with animated UI updates</li>
        </ul>
        
        <strong>Dev & Deployment</strong><br/>
        <ul>
            <li>Configured Xcode project, entitlements, and code signing for MultipeerConnectivity</li>
            <li>Tested on physical iOS devices to validate real-world peer-to-peer behavior</li>
            <li>Documented setup, architecture, and usage in a comprehensive README</li>
        </ul>
        
        <strong>Growth & Validation</strong><br/>
        <ul>
            <li>Led beta testing with 20+ users to validate core use cases</li>
            <li>Iterated product design based on real-world feedback and usage patterns</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Students and professionals frequently find themselves in situations where they need to communicate with nearby people but lack reliable internet connectivity or want to avoid platform dependencies. Campus networks are crowded, conferences have poor WiFi, and natural disasters can disable infrastructure. Existing messaging apps require internet, cloud servers, or tedious manual connection setup. There was no simple, automatic way for nearby devices to discover and message each other.<br/><br/>
        
        <strong>Solution:</strong> Built QuickReach, an iOS/macOS application that automatically discovers nearby devices using Apple's native MultipeerConnectivity framework and enables instant peer-to-peer messaging without any external infrastructure.<br/><br/>
        
        <strong>Key Implementation Details:</strong><br/>
        <ul>
            <li>Leveraged MultipeerConnectivity for automatic device discovery (no manual IP/connection setup)</li>
            <li>Implemented MVVM architecture with Combine reactive bindings for real-time state synchronization</li>
            <li>Built robust retry logic and error handling for unreliable wireless networks</li>
            <li>Designed iMessage-familiar UI to minimize user learning curve</li>
            <li>Ensured end-to-end encrypted communication with MCSession security</li>
        </ul><br/>
        
        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ <strong>Sub-second Message Delivery:</strong> Achieved &lt;500ms message delivery time in local networks</li>
            <li>✅ <strong>100% Auto-Discovery Success:</strong> Tested with up to 8 concurrent devices with automatic connection success</li>
            <li>✅ <strong>Zero-Configuration Deployment:</strong> Users open app and can immediately message nearby peers</li>
            <li>✅ <strong>Production-Ready Architecture:</strong> MVVM pattern with Combine enables easy feature extensions</li>
            <li>✅ <strong>Real-World Validation:</strong> Beta tested with 20+ users showing strong product-market fit</li>
            <li>✅ <strong>Scalability Proven:</strong> Architecture handles typical peer networks (5-20 concurrent devices)</li>
        </ul><br/>
        
        <strong>Key Learnings:</strong><br/>
        <ol>
            <li><strong>Native Framework Advantage:</strong> Using MultipeerConnectivity vs building custom P2P networking saved months</li>
            <li><strong>Reactive Architecture Power:</strong> Combine's @Published bindings simplified real-time state management</li>
            <li><strong>Physical Device Testing Necessity:</strong> MultipeerConnectivity limitations in simulators made actual device testing critical</li>
            <li><strong>Security by Default:</strong> MCSession's encryption requirement ensured security without additional implementation</li>
            <li><strong>Mesh Network Complexity:</strong> Managing peer state across multiple devices requires careful state synchronization design</li>
        </ol>
        `,
        sourceCode: 'https://github.com/cyrilkups/QuickReach',
        thumbnail: '/projects/images/quickreach .png',
        longThumbnail: '/projects/images/quickreach .png',
        images: ['/projects/images/quickreach .png'],
    },
    {
        title: 'CardFraudDetectAI',
        slug: 'card-fraud-detect-ai',
        techStack: [
            'Python',
            'FastAPI',
            'TensorFlow',
            'XGBoost',
            'LSTM Autoencoder',
            'Pandas',
            'NumPy',
            'PostgreSQL',
            'Claude Sonnet 4',
            'Bayesian Optimization',
            'SMOTE',
            'PCA',
            'Docker',
        ],
        thumbnail: '/projects/thumbnail/CreditFraudDetectAI.jpg',
        longThumbnail: '/projects/long/CreditFraudDetectAI.jpg',
        images: ['/projects/images/CreditFraudDetectAI.jpg'],
        liveUrl: '',
        sourceCode: 'https://github.com/cyrilkups/CardFraudDetectAI',
        year: 2025,
        description: `CardFraudDetectAI is an AI-driven fraud detection system designed to identify both known fraud patterns and emerging hidden anomaly behaviors in real-world transaction streams. The goal was to reduce false fraud alerts while improving the detection of subtle behavioral shifts that traditional rule-based models miss.<br/><br/>
        
        <strong>Key Features:</strong><br/>
        <ul>
            <li>🚨 <strong>Dual-Model Detection Pipeline:</strong> Combines XGBoost (structured fraud signals) + LSTM Autoencoder (temporal anomaly detection)</li>
            <li>📊 <strong>Feature Engineering System:</strong> Dynamic scaling, PCA reduction, and behavior sequence vectorization</li>
            <li>🏦 <strong>Financial-Grade Risk Scoring:</strong> Produces interpretable fraud confidence scores per transaction</li>
            <li>⚡ <strong>Low-Latency Prediction API:</strong> Built with FastAPI for real-time scoring workflows</li>
            <li>🧠 <strong>Explainable AI:</strong> Claude Sonnet 4 generates human-readable reasoning summaries for flagged anomalies</li>
        </ul><br/>
        
        <strong>Technical Highlights:</strong><br/>
        <ul>
            <li><strong>95% Precision on 1M+ Transactions:</strong> Achieved high precision and reduced false negatives through model ensembling and hyperparameter tuning</li>
            <li><strong>LSTM Autoencoder for Behavioral Anomaly Detection:</strong> Captures temporal spending sequences and reconstructs deviation signatures to detect non-obvious fraud cases</li>
            <li><strong>Class Rebalancing with SMOTE:</strong> Addressed severe class imbalance common in fraud datasets → boosted recall by 28%</li>
            <li><strong>Bayesian Hyperparameter Optimization:</strong> Reduced false negatives by 22% while improving stability under different transaction distributions</li>
            <li><strong>Human-Interpretable Fraud Reasoning:</strong> Leveraged Claude Sonnet 4 to convert cluster-level anomalies into explainable risk narratives, enabling audit compliance</li>
        </ul>
        `,
        role: `
        <strong>AI Engineer • Data Scientist • System Architect</strong><br/><br/>
        
        <strong>Research & Design:</strong><br/>
        <ul>
            <li>Evaluated fraud detection models, selected hybrid XGBoost + LSTM architecture</li>
        </ul>
        
        <strong>Data Engineering:</strong><br/>
        <ul>
            <li>Built ETL pipelines, feature normalization flows, and temporal sequence datasets</li>
        </ul>
        
        <strong>Model Training & Evaluation:</strong><br/>
        <ul>
            <li>Performed SMOTE balancing, PCA reduction, Bayesian tuning, cross-model validation</li>
        </ul>
        
        <strong>Backend & Serving:</strong><br/>
        <ul>
            <li>Deployed scoring API using FastAPI + Docker with async inference batching</li>
        </ul>
        
        <strong>Explainability Layer:</strong><br/>
        <ul>
            <li>Integrated Claude to generate case summaries for analyst workflow integration</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Traditional fraud systems over-rely on static rules, causing high false positives and missing new fraud behaviors.<br/><br/>
        
        <strong>Solution:</strong> Blend structural fraud pattern detection (XGBoost) with temporal anomaly detection (LSTM Autoencoder) and layer explainability to make signals actionable.<br/><br/>
        
        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ 95% precision on large-scale dataset</li>
            <li>✅ 22% reduction in false negatives</li>
            <li>✅ Detects emerging fraud patterns missed by baseline models</li>
            <li>✅ Produces audit-ready reason codes for analysts</li>
        </ul><br/>
        
        <p style="text-decoration: underline; text-decoration-color: #3b82f6; text-underline-offset: 4px;">Follow GitHub repo instructions to install plugin</p>
        `,
    },
    {
        title: 'SpecLinter',
        slug: 'spec-linter',
        techStack: [
            'TypeScript',
            'Node.js',
            'JSON Rule Engine',
            'AST Parsing',
            'File I/O Processing',
            'CLI Tooling',
            'Modular Plugin Architecture',
        ],
        thumbnail: '/projects/images/speclinter.png',
        longThumbnail: '/projects/images/speclinter.png',
        images: ['/projects/images/speclinter.png'],
        liveUrl: '',
        sourceCode: 'https://github.com/cyrilkups/SpecLinter',
        year: 2025,
        description: `SpecLinter is a backend specification validation engine that analyzes product requirement documents and component specifications to detect inconsistencies, missing assumptions, and spec–implementation mismatches. The tool enables consistent, repeatable validation of specs before engineers begin building, reducing ambiguity, misalignment, and rework across teams.<br/><br/>
        
        <strong>Key Features:</strong><br/>
        <ul>
            <li>🧠 <strong>Rule-Based Specification Checking:</strong> Validates requirements using configurable rule sets (e.g., naming, constraints, parameter expectations)</li>
            <li>📄 <strong>Structured Document Parsing:</strong> Reads YAML, JSON, or Markdown-based specs and converts them into a normalized internal representation</li>
            <li>🧩 <strong>Modular Rule Engine:</strong> Teams can define custom rule modules that can be swapped, extended, or tuned per project</li>
            <li>🏗️ <strong>Schema Compliance Enforcement:</strong> Checks field types, required fields, param ranges, and API signature consistency</li>
            <li>� <strong>Batch + CI Mode:</strong> Runs as a command-line tool or as part of automated CI pipelines to prevent invalid specs from shipping</li>
        </ul><br/>
        
        <strong>Technical Highlights:</strong><br/>
        <ul>
            <li><strong>Custom Parser & AST Builder:</strong> Converts semi-structured spec documents into an abstract syntax tree, enabling rule-based analysis</li>
            <li><strong>Rule Engine Runtime:</strong> Designed a multi-pass evaluation pipeline that performs validation at field level, schema level, and cross-component dependency level</li>
            <li><strong>Human-Readable Output Reports:</strong> Produces categorized issue summaries with severity levels and suggested corrections</li>
            <li><strong>CI Integration:</strong> Can be added to GitHub Actions or GitLab CI to fail builds when specs violate required policy</li>
            <li><strong>Zero UI Dependency:</strong> Entire system runs in Node.js — no user interface required</li>
        </ul>
        `,
        role: `
        <strong>Systems Architect • Backend Engineer</strong><br/><br/>
        
        <strong>Problem Definition:</strong><br/>
        <ul>
            <li>Identified recurring ambiguity in product specification workflows</li>
        </ul>
        
        <strong>Architecture:</strong><br/>
        <ul>
            <li>Designed modular rule engine to allow project-specific validation logic</li>
        </ul>
        
        <strong>Core Engine Development:</strong><br/>
        <ul>
            <li>Built AST transformer + validation pipeline in TypeScript</li>
        </ul>
        
        <strong>Configuration Design:</strong><br/>
        <ul>
            <li>Created JSON-based rule definition system for team customization</li>
        </ul>
        
        <strong>DevOps + Automation:</strong><br/>
        <ul>
            <li>Integrated into CI to prevent spec merges that fail checks</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Specs often contain inconsistencies that only surface during implementation — causing delays, backtracking, and disagreements across teams.<br/><br/>
        
        <strong>Solution:</strong> A backend-only linting engine that validates specifications before implementation starts — ensuring shared understanding and reducing risk.<br/><br/>
        
        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ Reduced spec-change churn and early-phase misunderstandings</li>
            <li>✅ Enabled standardized spec reviews across multiple contributors</li>
            <li>✅ Created a workflow that scales to teams, not individuals</li>
        </ul><br/>
        
        <p style="text-decoration: underline; text-decoration-color: #3b82f6; text-underline-offset: 4px;">Follow GitHub repo instructions to install plugin</p>
        `,
    },
    {
        title: 'Georim',
        slug: 'georim',
        techStack: ['Figma', 'Product Requirements (PRDs)', 'User Research'],
        thumbnail: '/projects/thumbnail/Georim.png',
        longThumbnail: '/projects/long/consulting-finance.jpg',
        images: ['/projects/images/Georim.png'],
        sourceCode:
            'https://www.figma.com/design/EqG0gHHNBEoviCTj6y4TjF/Georim?t=3CgPDsnSJdX3HwRE-1',
        liveUrl: 'https://www.eventsatgeorim.com/',
        year: 2024,
        description: `Georim is a mobile-first attendance platform that uses geofencing to verify event check-ins automatically. Designed for universities and student organizations, the system eliminates manual sign-in lines and inconsistent attendance records, improving both event experience and data reliability.<br/><br/>
        
        <strong>Problem:</strong><br/>
        Event attendance on campus was managed through QR codes, sign-in sheets, and manual validation, resulting in:<br/>
        <ul>
            <li>Long queues at event entrances</li>
            <li>Inaccurate or unverifiable attendance data</li>
            <li>Frustration among students and organizers</li>
        </ul><br/>
        The process created unnecessary friction for participants and made reporting difficult for organizations.<br/><br/>
        
        <strong>Goal:</strong><br/>
        Design a system that enables students to check in without performing an action, while ensuring organizers receive accurate, audit-ready attendance records.<br/><br/>
        
        <strong>Product Solution:</strong><br/>
        A geofence-triggered check-in system where users are automatically marked present when they enter the event radius.<br/><br/>
        
        <strong>Core Capabilities:</strong><br/>
        <ul>
            <li>📍 <strong>Automatic Attendance Verification:</strong> No scanning required</li>
            <li>🎫 <strong>Event Discovery & Registration:</strong> Browse and join campus events</li>
            <li>📊 <strong>Attendance Reporting & Export:</strong> Audit-ready data for organizers</li>
            <li>✅ <strong>Confirmation Notifications & Logging:</strong> Real-time feedback for users</li>
        </ul><br/>
        
        <strong>Key Design Decisions:</strong><br/>
        <ul>
            <li><strong>GPS Variation Challenge:</strong> Implemented dynamic radius adjustment & signal smoothing</li>
            <li><strong>User Confirmation:</strong> Added haptic + visual "Check-in Confirmed" feedback pattern</li>
            <li><strong>Audit Requirements:</strong> Included timestamped event records with export support</li>
        </ul>
        `,
        role: `
        <strong>Product Manager • UI/UX Designer</strong><br/>
        Team: 3 Engineers, Business Analyst, Cybersecurity<br/><br/>
        
        <strong>Product Management:</strong><br/>
        <ul>
            <li>Defined product scope and MVP through value vs. complexity prioritization</li>
            <li>Wrote PRDs and acceptance criteria for engineering team</li>
            <li>Managed rollout strategy and stakeholder expectations across student organizations</li>
        </ul>
        
        <strong>UX & Interaction Design:</strong><br/>
        <ul>
            <li>Designed user flows, wireframes, and high-fidelity screens in Figma</li>
            <li>Developed a lightweight design system for consistency across mobile views</li>
            <li>Ran usability testing at live campus events and led revision cycles</li>
        </ul>
        
        <strong>Research & Discovery:</strong><br/>
        <ul>
            <li>Conducted interviews with student government, club organizers, event directors, and frequent participants</li>
            <li>Key insight: Students wanted speed and invisibility, while organizers needed trustable data</li>
            <li>Shaped guiding principle: Check-ins should be passive, verifiable, and interruption-free</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Manual attendance tracking created long queues, inaccurate data, and frustration for both students and event organizers.<br/><br/>
        
        <strong>Solution:</strong> A geofence-triggered check-in system that automatically verifies attendance when students enter the event radius — no action required.<br/><br/>
        
        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ Reduced check-in time from 2–5 minutes → under 10 seconds</li>
            <li>✅ Eliminated entrance bottlenecks for large campus events</li>
            <li>✅ Attendance data became verifiable, consistent, and exportable</li>
            <li>✅ Adopted across multiple student organizations</li>
        </ul>
        `,
    },
    {
        title: 'DocLink',
        slug: 'doc-link',
        techStack: [
            'Python',
            'Flask',
            'SQLite',
            'PostgreSQL',
            'Jinja Templates',
            'Session Management',
            'Role-Based Access Control',
            'REST Endpoints',
        ],
        thumbnail: '/projects/thumbnail/doc-link.png',
        longThumbnail: '/projects/long/doc-link.jpg',
        images: ['/projects/images/DocLink.png'],
        liveUrl: 'https://doclink1.onrender.com',
        sourceCode: '',
        year: 2023,
        description: `DocLink is a secure referral coordination system that allows doctors to connect, schedule consultations, exchange medical information, and securely share case documents. The platform streamlines inter-physician collaboration so patients receive faster, better-aligned care — especially when transitioning across facilities or specialists.<br/><br/>
        
        <strong>Key Features:</strong><br/>
        <ul>
            <li>👨‍⚕️ <strong>Verified Medical Accounts:</strong> Doctors register using NIER License ID for identity validation</li>
            <li>🔗 <strong>Doctor-to-Doctor Referral Network:</strong> Send, receive, approve, and manage connection requests</li>
            <li>📅 <strong>Cross-Specialty Appointment Scheduling:</strong> Coordinated scheduling between connected doctors</li>
            <li>💬 <strong>Encrypted Messaging + File Sharing:</strong> Share case summaries, radiology files, reports, and notes securely</li>
            <li>🗂️ <strong>Consultation Timeline Tracking:</strong> View interaction history for ongoing care continuity</li>
            <li>🧑‍💼 <strong>Profile + Case Management:</strong> Manage specialization, practice info, and patient handling context</li>
        </ul><br/>
        
        <strong>Technical Highlights:</strong><br/>
        <ul>
            <li><strong>Secure Session + Credentials Layer:</strong> Password hashing, secure token handling, session expiration, request input sanitization</li>
            <li><strong>Access Control Logic:</strong> Only connected and mutually approved doctors may communicate or exchange files</li>
            <li><strong>File Security & Upload Handling:</strong> Protected upload directory, MIME validation, file size limits, storage path hashing</li>
            <li><strong>Database Design for Medical Workflow:</strong> Structured relational schema for doctor profiles, connection state, consultation logs, chat messages, and appointment blocks</li>
            <li><strong>REST-Structured Endpoints:</strong> Each workflow (auth → connection → scheduling → messaging) encapsulated in modular routes</li>
            <li><strong>Clean MVC Structure:</strong> Flask app layered into routing controllers, templates for UI, and database interaction layer</li>
        </ul>
        `,
        role: `
        <strong>Backend Engineer • System Designer</strong><br/><br/>
        
        <strong>Data Modeling:</strong><br/>
        <ul>
            <li>Designed normalized schema for doctors, referrals, messages, and appointments</li>
        </ul>
        
        <strong>Authentication Layer:</strong><br/>
        <ul>
            <li>Implemented ID-based login, password hashing, and secured session workflows</li>
        </ul>
        
        <strong>Workflow Logic:</strong><br/>
        <ul>
            <li>Built request approval, scheduling, file-sharing, and consultation lifecycle flows</li>
        </ul>
        
        <strong>Security Hardening:</strong><br/>
        <ul>
            <li>Implemented access restriction checks + sanitization on user inputs and uploads</li>
        </ul>
        
        <strong>Deployment Support:</strong><br/>
        <ul>
            <li>Configured environment setup and DB initialization scripts</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Physician referrals often rely on calls, texts, or informal networks, leading to delays and incomplete patient information transfer.<br/><br/>
        
        <strong>Solution:</strong> A secure digital workflow that standardizes referral communication, scheduling, and data exchange between verified doctors.<br/><br/>
        
        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ Reduced miscommunication and manual scheduling friction</li>
            <li>✅ Improved patient continuity-of-care across specialties</li>
            <li>✅ Delivered a simple, secure collaboration channel for clinicians</li>
        </ul>
        `,
    },
    {
        title: 'StockInsightEngine',
        slug: 'stock-insight-engine',
        techStack: [
            'Python',
            'Streamlit',
            'Plotly',
            'Pandas',
            'NumPy',
            'SQLAlchemy',
            'yFinance API',
        ],
        thumbnail: '/projects/images/stockengine.png',
        longThumbnail: '/projects/images/stockengine.png',
        images: ['/projects/images/stockengine.png'],
        sourceCode: '',
        liveUrl: '',
        year: 2024,
        description: `StockInsightEngine is an interactive market analysis platform that allows users to explore a stock's performance, fundamentals, and risk profile in a single, streamlined interface. The goal was to create a central workspace where investors can move from raw price data to actionable insight without switching between multiple tools.<br/><br/>

            <strong>Problem</strong><br/>
            Most beginner and intermediate investors analyze stocks using separate platforms for charts, financial summaries, and return calculations. This fragmentation makes it difficult to understand real performance behavior, compare stocks meaningfully, and build confidence in investment decisions. There was a need for a unified, interpretable, and data-driven analysis experience.<br/><br/>

            <strong>Solution</strong><br/>
            I designed and developed a real-time stock insight platform that combines interactive charting (candlesticks, volume overlays), technical indicators (moving averages), return & risk analysis (volatility, Sharpe ratio), company financial context, and watchlists with preference storage. All features are displayed in a single analysis workflow, improving clarity and decision efficiency.<br/><br/>

            <strong>Core Capabilities:</strong><br/>
            <ul>
                <li>📈 <strong>Live Price Data:</strong> Real-time and historical performance data via yFinance</li>
                <li>📊 <strong>Interactive Visualizations:</strong> Candlestick + volume charts with Plotly</li>
                <li>� <strong>Technical Indicators:</strong> 50-day and 200-day moving average overlays</li>
                <li>🎯 <strong>Risk Analysis:</strong> Return and volatility calculations with Pandas/NumPy</li>
                <li>� <strong>Financial Metrics:</strong> Company overview and key financial data</li>
                <li>⭐ <strong>Persistent Storage:</strong> Watchlist and recent search tracking with SQLite + SQLAlchemy</li>
                <li>� <strong>Responsive Design:</strong> Light/Dark theme and adaptive layout for usability</li>
            </ul><br/>

            <strong>Impact</strong><br/>
            The platform allows users to move from raw data → interpretation → personal tracking in one interface, reducing research time and improving clarity when evaluating stocks. The experience encourages evidence-based decision making rather than emotional or momentum-driven choices.`,
        role: `Data Analyst & Developer`,
    },
    {
        title: 'Braille Technology',
        slug: 'braille-technology',
        year: 2026,
        techStack: [
            'Swift',
            'SwiftUI',
            'Core Haptics',
            'Apple Intelligence',
            'MVVM',
            'Combine',
            'XCTest',
        ],
        thumbnail: '/projects/images/braille-technology.png',
        longThumbnail: '/projects/images/braille-technology.png',
        images: ['/projects/images/braille-technology.png'],
        liveUrl: '',
        sourceCode: 'https://github.com/cyrilkups/BrailleTechnology',
        description: `Braille Technology is an AI-powered tactile interface that converts structured digital meaning into haptic intelligence. It replaces visual screens with a braille-dominant interaction layer where every gesture, every notification, and every reply is driven entirely by touch — no vision or hearing required. Built for deafblind users. Designed for everyone.<br/><br/>

        <strong>Key Features:</strong><br/>
        <ul>
            <li>🤲 <strong>Tactile Braille Reading:</strong> Drag across braille dots to read — each character fires a unique haptic burst based on its 6-dot bitmask pattern</li>
            <li>⌨️ <strong>6-Dot Braille Keyboard:</strong> Compose and send replies entirely through touch with haptic success/failure feedback</li>
            <li>🧠 <strong>AI Semantic Compression:</strong> On-device Apple Intelligence distills messages into tactile summaries preserving intent, urgency, and emotional tone</li>
            <li>🚨 <strong>Fraud Alert Room:</strong> Dedicated response flow — Freeze Card / Call Bank / Ignore — operable without sight or sound</li>
            <li>📵 <strong>Offline-First & Private:</strong> All processing on-device; no raw message content leaves the phone</li>
            <li>⌚ <strong>Apple Watch Layer:</strong> Wrist-level urgency alerts with stress-aware escalation (roadmap)</li>
        </ul><br/>

        <strong>Technical Highlights:</strong><br/>
        <ul>
            <li><strong>310+ Deterministic Unit Tests:</strong> Full state machine coverage across 26 test files using SpyHapticService to assert exact haptic event sequences</li>
            <li><strong>Generic State Machine:</strong> <code>SenseLayerState&lt;HapticService&gt;</code> enables test injection without any UI dependency</li>
            <li><strong>Per-Character Tactile Fingerprints:</strong> Each braille cell drives a unique burst — pulse count, timing gaps, and per-dot-position intensity vary so every letter feels distinct</li>
            <li><strong>Core Haptics Integration:</strong> CHHapticEngine for precise patterned haptic rendering; fallback to UIImpactFeedbackGenerator on older devices</li>
            <li><strong>Dependency Injection Throughout:</strong> SendService, Scheduler, HapticService, and MessageRepository are all protocols with mock implementations</li>
        </ul>
        `,
        role: `
        <strong>Founder • Architect • iOS Engineer</strong><br/><br/>

        <strong>Vision & Product:</strong><br/>
        <ul>
            <li>Defined the post-visual interaction paradigm and core UX principles (gesture-only, zero audio reliance, on-device privacy)</li>
            <li>Designed the complete deafblind user journey from fraud alert detection → action in under 30 seconds</li>
        </ul>

        <strong>System Architecture:</strong><br/>
        <ul>
            <li>Designed a deterministic state machine generic over HapticService for full testability</li>
            <li>Built the haptic language specification: per-character tactile fingerprints, urgency-weighted alert signatures, and navigation boundary bumps</li>
            <li>Architected the AI compression pipeline: semantic summarization, urgency scoring, and tone detection — all on-device</li>
        </ul>

        <strong>Engineering:</strong><br/>
        <ul>
            <li>Implemented BrailleCellMapper, TactileEngine, CompressionService, DraftStore, and SendService</li>
            <li>Built 310+ unit and integration tests using SpyHapticService and TestScheduler</li>
            <li>Developed the 6-dot braille keyboard with commit/space/delete/send gesture flows</li>
        </ul>

        <strong>Testing & Quality:</strong><br/>
        <ul>
            <li>Verified all state transitions, haptic sequences, draft persistence, and urgent message queuing</li>
            <li>Established contribution standards: spy assertions required for all state machine changes</li>
        </ul>
        `,
        caseStudy: `
        <strong>Problem:</strong> Deafblind users have no independent path to time-critical information. When a fraud alert arrives, they cannot see a banner, hear a ringtone, or scan a screen. They must depend on another person — surrendering autonomy at the exact moment it matters most. Today's accessibility tools (VoiceOver, external braille displays) translate overload; they do not solve it.<br/><br/>

        <strong>Solution:</strong> A software-only tactile operating layer where every notification, message, and reply flows through a structured haptic language. AI compresses meaning before it reaches the user. The state machine ensures every interaction is gesture-driven and predictable. No vision required. No sound required. No hardware attachment required.<br/><br/>

        <strong>Key Implementation Details:</strong><br/>
        <ul>
            <li>MultipeerConnectivity-style session model replaced by CHHapticEngine + gesture recognizer stack</li>
            <li>Urgency scoring surfaces fraud alerts with a sharper, faster haptic signature than routine messages</li>
            <li>60-second inactivity timer auto-saves drafts and returns to home — preventing lost work</li>
            <li>Fraud response room hardcoded as a first-class state to minimize time-to-action under stress</li>
        </ul><br/>

        <strong>Outcome:</strong><br/>
        <ul>
            <li>✅ Detection → comprehension → decision → action → confirmation in under 30 seconds</li>
            <li>✅ 5 gestures to read and reply (vs. 15+ with VoiceOver + keyboard)</li>
            <li>✅ 310+ passing tests proving correctness of every state transition and haptic sequence</li>
            <li>✅ Full two-way tactile communication: read, compose, and send without any sighted assistance</li>
            <li>✅ On-device privacy architecture — no raw message content transmitted externally</li>
        </ul>
        `,
    },
];

export const MY_EXPERIENCE: IExperience[] = [
    {
        title: 'AR/VR Designer & Developer',
        company: 'Voices of Grambling Initiative',
        duration: 'Sept 2025 - Present',
    },
    {
        title: 'Software Engineering Intern',
        company: 'Ckodon Tech',
        duration: 'May 2025 - Aug 2025',
    },
    {
        title: 'Software Engineering Fellow',
        company: 'Google',
        duration: 'Oct 2024 - Jan 2025',
    },
    {
        title: 'Product Strategy Extern',
        company: 'PricewaterhouseCoopers',
        duration: 'Apr 2025 - Jul 2025',
    },
    {
        title: 'Research Assistant',
        company: 'Kwame Nkrumah University of Science and Technology',
        duration: 'Oct 2023 - Sep 2024',
        url: 'https://webapps.knust.edu.gh/just/index.php?journal=just&page=search&op=authors&path%5B%5D=view&givenName=Cyril%20Ofori%20&familyName=Kupualor&affiliation=&country=GH&authorName=Kupualor%2C%20Cyril%20Ofori%20',
    },
];
