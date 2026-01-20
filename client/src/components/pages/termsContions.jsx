import React from 'react'
import Navigation from '../navigation'
import Footer from '../footer'

const TermsConditions = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navigation />
        <main className='flex-grow border m-auto border-gray-300 w-[60%] border-b-0 p-5'>
            <h1>Terms & Conditions</h1>
            <div className='flex flex-col'>
                <p className='underline'>Last updated: 20.01.2026</p>
                <p>
                    Welcome to our website. By accessing or using this service, you agree to be bound by the following Terms & Conditions. If you do not agree with any part of these terms, please do not use the website.
                </p>
                <br />
                <h2><strong>1. Use of the Website</strong></h2>
                <p>
                    This website is provided for personal and non-commercial use only. You agree not to use the website for any unlawful purpose or in a way that could harm the service, other users, or third parties.
                </p>
                <h2><strong>2. User Accounts</strong></h2>
                <p>
                    If you create an account on our website, you are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account.
                </p>
                <h2><strong>3. Content</strong></h2>
                <p>
                    All content provided on this website is for informational purposes only. We reserve the right to modify, update, or remove any content at any time without prior notice.
                </p>
                <h2><strong>4. Intellectual Property</strong></h2>
                <p>
                    All materials on this website, including text, design, logos, and code, are the property of the project owner unless otherwise stated. Unauthorized use is prohibited.
                </p>
                <h2><strong>5. Limitation of Liability</strong></h2>
                <p>
                    We are not responsible for any damages, losses, or issues arising from the use or inability to use this website.
                </p>
                <h2><strong>6. Termination</strong></h2>
                <p>
                    We reserve the right to suspend or terminate access to the website at any time if these Terms & Conditions are violated.
                </p>
                <h2><strong>7. Changes to These Terms</strong></h2>
                <p>
                    We may update these Terms & Conditions from time to time. Continued use of the website after changes means you accept the updated terms.
                </p>
                <h2><strong>8. Contact</strong></h2>
                <p>
                    If you have any questions regarding these Terms & Conditions, please contact us.
                </p>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default TermsConditions