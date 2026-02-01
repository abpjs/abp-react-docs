import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type FeatureItem = {
  icon: string;
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
  { name: 'Theme', description: 'Toasts, confirmations, theming', image: '/img/modules/setting-management.svg', link: '/docs/packages/theme-shared/overview' },
];

const proModules: ModuleItem[] = [
  { name: 'Account Pro', description: 'Password recovery, 2FA, profiles', image: '/img/modules/account-pro.svg', link: '/docs/packages/account-pro/overview' },
  { name: 'Identity Pro', description: 'Claim types, user/role claims', image: '/img/modules/identity-pro.svg', link: '/docs/packages/identity-pro/overview' },
  { name: 'Audit Logs', description: 'Audit logs with filtering', image: '/img/modules/audit-logging.svg', link: '/docs/packages/audit-logging/overview' },
  { name: 'Languages', description: 'Language and localization management', image: '/img/modules/text-template-management.svg', link: '/docs/packages/language-management/overview' },
  { name: 'SaaS', description: 'Tenants, editions, connections', image: '/img/modules/saas.svg', link: '/docs/packages/saas/overview' },
];

const features: FeatureItem[] = [
  {
    icon: '🔐',
    title: 'Easy Authentication',
    description:
      'Built-in OAuth2/OIDC support with ready-to-use login, registration, and multi-tenant switching components.',
  },
  {
    icon: '⚡',
    title: 'ABP Framework Integration',
    description:
      'Seamlessly connect to your ABP backend with pre-built services for identity, permissions, tenant management, and localization.',
  },
  {
    icon: '📦',
    title: 'Modular Architecture',
    description:
      'Pick only the packages you need. Each module is independent and built with React, TypeScript, and Chakra UI.',
  },
  {
    icon: '🎨',
    title: 'Chakra UI Components',
    description:
      'Beautiful, accessible components built on Chakra UI. Fully customizable to match your brand.',
  },
  {
    icon: '🌐',
    title: 'Multi-Tenancy Ready',
    description:
      'Full multi-tenant support out of the box. Switch tenants, manage tenant-specific settings, and more.',
  },
  {
    icon: '🎛️',
    title: 'Feature Management',
    description:
      'Control tenant features with the built-in Feature Management module. Enable, disable, or configure features per tenant.',
  },
];

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

        {/* Badge */}
        <Link to="/docs/release-notes/v2.1.1" className={styles.badge}>
          <span className={styles.badgeIcon}>✨</span>
          <span>v2.1.1 is now available</span>
          <span className={styles.badgeArrow}>→</span>
        </Link>

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
        <div className={styles.quickStartWrapper}>
          <div className={styles.quickStart}>
            <span className={styles.quickStartDot} />
            <code className={styles.quickStartCode}>
              npx create-abp-react my-app
            </code>
            <button
              className={styles.copyButton}
              onClick={() => navigator.clipboard.writeText('npx create-abp-react my-app')}
              title="Copy to clipboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
          <p className={styles.quickStartHelper}>Get up and running in seconds</p>
        </div>
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
        <FeaturesSection />
        <CTASection />
      </main>
    </Layout>
  );
}
