import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

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
        {/* Badge */}
        <Link to="/docs/" className={styles.badge}>
          <span className={styles.badgeIcon}>✨</span>
          <span>v0.8.0 is now available</span>
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
            <span className={styles.buttonIcon}>📖</span>
            Read the Docs
          </Link>
        </div>

        {/* Quick start */}
        <div className={styles.quickStart}>
          <div className={styles.quickStartLabel}>Quick Start</div>
          <code className={styles.quickStartCode}>
            npx create-abp-react my-app
          </code>
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="Official documentation for ABP React - a React framework for building applications with ABP Framework"
    >
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </Layout>
  );
}
