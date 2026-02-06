import { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

type ModuleItem = {
  name: string;
  description: string;
  image: string;
  link: string;
};

const freeModules: ModuleItem[] = [
  { name: 'Core', description: 'Authentication, configuration, localization', image: '/img/modules/identity.svg', link: '/docs/packages/core/overview' },
  { name: 'Account', description: 'Login, registration, tenant switching', image: '/img/modules/account.svg', link: '/docs/packages/account/overview' },
  { name: 'Identity', description: 'User and role management', image: '/img/modules/identity.svg', link: '/docs/packages/identity/overview' },
  { name: 'Features', description: 'Feature management modal', image: '/img/modules/feature-management.svg', link: '/docs/packages/feature-management/overview' },
  { name: 'Permissions', description: 'Permission management modal', image: '/img/modules/identity.svg', link: '/docs/packages/permission-management/overview' },
  { name: 'Settings', description: 'Email and identity settings', image: '/img/modules/setting-management.svg', link: '/docs/packages/setting-management/overview' },
  { name: 'Tenants', description: 'Multi-tenant management', image: '/img/modules/tenant-management.svg', link: '/docs/packages/tenant-management/overview' },
  { name: 'Theme', description: 'Toasts, confirmations, theming', image: '/img/modules/theme.svg', link: '/docs/packages/theme-shared/overview' },
];

const proModules: ModuleItem[] = [
  { name: 'Account Pro', description: 'Password recovery, 2FA, profiles', image: '/img/modules/account-pro.svg', link: '/docs/packages/account-pro/overview' },
  { name: 'Identity Pro', description: 'Claim types, user/role claims', image: '/img/modules/identity-pro.svg', link: '/docs/packages/identity-pro/overview' },
  { name: 'Audit Logs', description: 'Audit logs with filtering', image: '/img/modules/audit-logging.svg', link: '/docs/packages/audit-logging/overview' },
  { name: 'Languages', description: 'Language and localization management', image: '/img/modules/language-management.svg', link: '/docs/packages/language-management/overview' },
  { name: 'SaaS', description: 'Tenants, editions, connections', image: '/img/modules/saas.svg', link: '/docs/packages/saas/overview' },
  { name: 'Text Templates', description: 'Text template management', image: '/img/modules/text-template-management.svg', link: '/docs/packages/text-template-management/overview' },
];

type TechStackItem = {
  name: string;
  image: string;
};

const techStack: TechStackItem[] = [
  { name: 'React 18', image: '/img/stack/react.svg' },
  { name: 'TypeScript', image: '/img/stack/typescript.svg' },
  { name: 'Vite', image: '/img/stack/vite.svg' },
  { name: 'Chakra UI', image: '/img/stack/chakraui.svg' },
  { name: 'React Query', image: '/img/stack/react-query.svg' },
  { name: 'React Hook Form', image: '/img/stack/reactHookForm.svg' },
];

type EnterpriseFeature = {
  icon: ReactNode;
  title: string;
  items: string[];
};

const enterpriseFeatures: EnterpriseFeature[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Advanced Security',
    items: [
      'Role-Based Access Control (RBAC)',
      'Fine-grained Permission System',
      'Organization Units Management',
      'Two-Factor Authentication Support',
    ],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Audit & Compliance',
    items: [
      'Automatic Audit Logging',
      'Entity Change Tracking',
      'User Login/Action History',
      'GDPR Compliance Tools',
    ],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Scalable Architecture',
    items: [
      'Microservices Support',
      'Distributed Event Bus',
      'Background Job System',
      'Multi-Tenancy Data Isolation',
    ],
  },
];

const features: FeatureItem[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Enterprise Security',
    description:
      'Built-in authentication, authorization, and permission management based on industry standards.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Modular Design',
    description:
      'Fully modular architecture allowing you to compose your application from independent, reusable modules.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Multi-Tenancy',
    description:
      'First-class support for SaaS applications with automated tenant resolution and data isolation.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'High Performance',
    description:
      'Optimized for speed with code splitting, lazy loading, and efficient state management.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Identity Management',
    description:
      'Complete user, role, and organization unit management system ready to use.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Rapid Development',
    description:
      'CLI tools, code generators, and pre-built components to speed up your development cycle.',
  },
];

function QuickStartCommand(): ReactNode {
  const [copied, setCopied] = useState(false);
  const command = 'npx create-abp-react my-app';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.quickStartWrapper}>
      <div className={styles.quickStart}>
        <span className={styles.quickStartDot} />
        <code className={styles.quickStartCode}>{command}</code>
        <button
          className={styles.copyButton}
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? (
            <span className={styles.copiedTooltip}>Copied!</span>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      <p className={styles.quickStartHelper}>Get up and running in seconds</p>
    </div>
  );
}

function HeroSection(): ReactNode {
  return (
    <section className={styles.heroSection}>
      {/* Background effects */}
      <div className={styles.heroBackground}>
        <div className={`${styles.glowOrb} ${styles.glowOrb1}`} />
        <div className={`${styles.glowOrb} ${styles.glowOrb2}`} />
        <div className={`${styles.glowOrb} ${styles.glowOrb3}`} />
        <div className={styles.starField} />
      </div>

      {/* Main content */}
      <div className={styles.heroContent}>
        {/* Experience tag */}
        <span className={styles.experienceTag}>Built on 5+ Years of ABP Excellence</span>

        {/* Headline */}
        <h1 className={styles.heroTitle}>
          Build React Apps with{' '}
          <span className={styles.heroTitleHighlight}>ABP Framework</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          A comprehensive React library for building enterprise applications with ABP
          Framework. Authentication, permissions, multi-tenancy, and more - all ready
          to use.
        </p>

        {/* CTA Buttons */}
        <div className={styles.buttons}>
          <Link to="/docs/" className={styles.buttonPrimary}>
            Get Started
            <span className={styles.buttonIcon}>→</span>
          </Link>
          <Link to="/docs/" className={styles.buttonSecondary}>
            <span className={styles.buttonIcon}>&lt;/&gt;</span>
            View Documentation
          </Link>
        </div>

        {/* Quick start */}
        <QuickStartCommand />
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse} />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

function FeaturesSection(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresHeader}>
        <span className={styles.featuresBadge}>Features</span>
        <h2 className={styles.featuresTitle}>
          Everything you need to build ABP React apps
        </h2>
        <p className={styles.featuresSubtitle}>
          A complete toolkit for building enterprise-grade React applications with ABP
          Framework integration.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ModulesSection(): ReactNode {
  return (
    <section className={styles.modulesSection}>
      <div className={styles.featuresHeader}>
        <span className={styles.featuresBadge}>Packages</span>
        <h2 className={styles.featuresTitle}>Modular by Design</h2>
        <p className={styles.featuresSubtitle}>
          Pick only the packages you need. Each module is independent and fully typed.
        </p>
      </div>

      <div className={styles.modulesContainer}>
        <div className={styles.moduleCategory}>
          <h3 className={styles.moduleCategoryTitle}>Free Packages</h3>
          <p className={styles.moduleCategoryDesc}>Works with open-source ABP Framework</p>
          <div className={styles.modulesGrid}>
            {freeModules.map((module, index) => (
              <Link key={index} to={module.link} className={styles.moduleCard}>
                <img src={module.image} alt={module.name} className={styles.moduleImage} />
                <div className={styles.moduleInfo}>
                  <span className={styles.moduleName}>{module.name}</span>
                  <span className={styles.moduleDesc}>{module.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.moduleCategory}>
          <h3 className={styles.moduleCategoryTitle}>Pro Packages</h3>
          <p className={styles.moduleCategoryDesc}>Requires ABP Commercial backend modules</p>
          <div className={styles.modulesGrid}>
            {proModules.map((module, index) => (
              <Link key={index} to={module.link} className={styles.moduleCard}>
                <img src={module.image} alt={module.name} className={styles.moduleImage} />
                <div className={styles.moduleInfo}>
                  <span className={styles.moduleName}>{module.name}</span>
                  <span className={styles.moduleDesc}>{module.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection(): ReactNode {
  return (
    <section className={styles.techStackSection}>
      <div className={styles.featuresHeader}>
        <span className={styles.featuresBadge}>Technology</span>
        <h2 className={styles.featuresTitle}>Modern Technology Stack</h2>
        <p className={styles.featuresSubtitle}>
          Built with the latest and most robust tools in the React ecosystem. Future-proof your application with industry standards.
        </p>
      </div>

      <div className={styles.techStackGrid}>
        {techStack.map((tech, index) => (
          <div key={index} className={styles.techStackCard}>
            <img src={tech.image} alt={tech.name} className={styles.techStackImage} />
            <span className={styles.techStackName}>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function EnterpriseSection(): ReactNode {
  return (
    <section className={styles.enterpriseSection}>
      <div className={styles.featuresHeader}>
        <span className={styles.featuresBadge}>Enterprise Ready</span>
        <h2 className={styles.featuresTitle}>Built for Mission-Critical Applications</h2>
        <p className={styles.featuresSubtitle}>
          Don't reinvent the wheel. ABP React comes with sophisticated enterprise capabilities
          that would take months to build from scratch.
        </p>
      </div>

      <div className={styles.enterpriseGrid}>
        {enterpriseFeatures.map((feature, index) => (
          <div key={index} className={styles.enterpriseCard}>
            <div className={styles.enterpriseCardHeader}>
              <div className={styles.enterpriseIcon}>{feature.icon}</div>
              <h3 className={styles.enterpriseCardTitle}>{feature.title}</h3>
            </div>
            <ul className={styles.enterpriseList}>
              {feature.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.enterpriseListItem}>
                  <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to get started?</h2>
        <p className={styles.ctaSubtitle}>
          Start building your ABP React application today.
        </p>
        <div className={styles.buttons}>
          <Link to="/docs/" className={styles.buttonPrimary}>
            Get Started
            <span className={styles.buttonIcon}>→</span>
          </Link>
          <a
            href="https://github.com/abpjs/abp-react"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonSecondary}
          >
            <span className={styles.buttonIcon}>⭐</span>
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Official documentation for ABP React - a React framework for building applications with ABP Framework"
    >
      <main>
        <HeroSection />
        <ModulesSection />
        <TechStackSection />
        <FeaturesSection />
        <EnterpriseSection />
        <CTASection />
      </main>
    </Layout>
  );
}
