import React from 'react'
import Navigation from '../navigation'
import Footer from '../footer'

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navigation />
        <main className='flex-grow border m-auto border-gray-300 w-[60%] border-b-0 p-5'>
            <h1>Privacy Policy</h1>
            <div className='flex- flex-col ml-5'>
                <p className='underline'>Last updated: 20.01.2026</p>
                <p>
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
                </p>
                <br />
                <h2><strong>1. Information We Collect</strong></h2>
                <p>
                    We may collect the following types of information:
                </p>
                <ul className='list list-disc'>
                    <li>Personal information you provide (such as email or username)</li>
                    <li>Personal information you provide (such as email or username)</li>
                    <li>Technical data (such as browser type, device, or IP address)</li>
                </ul>
                <h2><strong>2. How We Use Information</strong></h2>
                <p>We use collected information to:</p>
                <ul className='list list-disc'>
                    <li>Provide and maintain the service</li>
                    <li>Improve website functionality</li>
                    <li>Communicate with users when necessary</li>
                    <li>Ensure security and prevent abuse</li>
                </ul>
                <h2><strong>3. Cookies</strong></h2>
                <p>
                    We may use cookies to enhance user experience. You can disable cookies in your browser settings, but some features may not work properly.
                </p>
                <h2><strong>4. Data Protection</strong></h2>
                <p>
                    We take reasonable measures to protect your data but cannot guarantee absolute security.
                </p>
                <h2><strong>5. Third-Party Services</strong></h2>
                <p>
                    We may use third-party services for analytics or authentication. These services have their own privacy policies.
                </p>
                <h2><strong>6. User Rights</strong></h2>
                <p>
                    You have the right to request access to, correction of, or deletion of your personal data.
                </p>
                <h2><strong>7. Changes to This Policy</strong></h2>
                <p>
                    This Privacy Policy may be updated occasionally. Any changes will be posted on this page.
                </p>
                <h2><strong>8. Contact</strong></h2>
                <p>
                    This Privacy Policy may be updated occasionally. Any changes will be posted on this page.
                </p>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default PrivacyPolicy