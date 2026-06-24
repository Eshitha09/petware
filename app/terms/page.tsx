import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Petware Ltd',
  description: 'Petware Limited terms of trade governing all wholesale supply relationships in New Zealand.',
  alternates: { canonical: 'https://petware.co.nz/terms' },
}

const sections = [
  {
    id: 'A',
    title: 'Pricing',
    body: `Products will be invoiced at a price per unit unless specifically indicated. Prices and specifications in the company's price list are subject to change without notice. If indent or special quantity pricing is quoted, such pricing is based upon the price of goods to the company as at the date of such quotation and are subject to amendment by the company on or at any time after acceptance, but before the dispatch of the product from the company to the customer. The customer will be notified of any amendment. All prices for indent or special goods are valid for one month only after the date on which such price is given. At the expiration of one month the company reserves the right to alter the price quoted for ordered goods.`,
  },
  {
    id: 'B',
    title: 'Goods and Services Tax',
    body: `The company shall be entitled to charge the amount of Goods and Services Tax payable whether or not included in a quotation or invoice.`,
  },
  {
    id: 'C',
    title: 'Payment',
    body: `Payment is to be made by the customer to the company upon collection of the goods or, in the case of delivery by courier, carrier or post, payment is to be received by the company before the dispatch of goods. Payment must be by way of direct credit, bank cheque, or cheque/bank draft which must be accepted and cleared through the banking system. The company has the right to approve and change credit arrangements from time to time and to include a limit on any particular account.\n\nPayments other than for direct credit, cash or special account customers, are to be on the 20th of the month following the month of invoice.\n\nIf payment is not received in full within 7 days of due date, the company may charge interest at the rate of 2% per month or 2% over the company's then overdraft rate payable by it to its principal bank. Interest on any amount outstanding is calculated on a daily basis from the date on which such payment was due to the actual date of payment.`,
  },
  {
    id: 'D',
    title: 'Quotations',
    body: `When quotations are based on written or oral instructions and such instructions are vague or misleading and are different from that originally submitted or described, an extra charge will be made by the company to the customer for any additional work or cost required or incurred by the company.`,
  },
  {
    id: 'E',
    title: 'Delivery',
    body: `The price of goods is the price for such goods at the premises of the company unless otherwise specified. The company reserves the right to charge for all reasonable freight charges incurred by it. If free freight is applicable, orders are shipped pre-paid in accordance with the mode selected by the company. If the customer requests urgent delivery outside the company's normal delivery itinerary, a freight charge for urgent or special services will be added to the invoice.`,
  },
  {
    id: 'F',
    title: 'Force Majeure',
    body: `The company is not responsible for non-delivery caused by any matters of any type or nature whatsoever without limitation beyond its control. In any event the customer is bound to accept and pay for goods which are delivered or deemed delivered to the customer after the cause of delay has ceased to exist. In the case of force majeure either party shall have the right to cancel any order or any part order not delivered within two calendar months.`,
  },
  {
    id: 'G',
    title: 'Claims',
    body: `The goods will be dispatched by the company to the customer in good and saleable condition. The company reserves the right not to recognise any claims regarding the condition of the goods unless such claim is made and notified to the company within 48 hours of receipt of the goods by the customer. Details of any claim including damage or shortage should be noted on your copy of the carrier freight bill and the carrier or its representative should countersign the document.`,
  },
  {
    id: 'H',
    title: 'Credits and Returns',
    body: `Goods will not be accepted for return or credit unless the company has given prior approval to the customer. Unauthorised returned goods will be returned to the customer and the customer will be responsible for freight.\n\nGoods authorised for return with an RGA (Returned Goods Authorisation) number must be returned within 5 days. Application for credit of goods returned must be made within 7 days of delivery to the customer to be eligible for a credit, provided that the goods are in the same condition as when shipped by the company.\n\nGoods returned for other reasons must be returned to the company freight pre-paid and may be subject to a 15% restocking fee at the sole discretion of the company.`,
  },
  {
    id: 'I',
    title: 'Consumer Guarantees Act 1993',
    body: `If goods are being purchased by the customer for business purposes as defined in the Consumer Guarantees Act 1993, then pursuant to the provisions of Section 43 of the Consumer Guarantees Act, the terms and guarantees of the Consumer Guarantees Act do not apply to this transaction. The customer acknowledges its requirement to insert a similar provision for goods re-supplied by it.`,
  },
  {
    id: 'J',
    title: 'Privacy Act',
    body: `All information gathered by the company about the customer or in relation to the customer's financial circumstances has been collected by the company for general requirements and to determine the credit-worthiness of the customer. The customer authorises the exchange of this information with any other credit agency or third party nominated by the company. The company acknowledges the customer's right of access to and correction of any Privacy Act information held by the company about the customer.`,
  },
  {
    id: 'K',
    title: 'Risk and Ownership of Title',
    body: `Risk in the goods shall pass to the customer upon delivery, but ownership and title in the goods shall remain with the company until payment in full. The customer agrees to insure the goods upon delivery.\n\nFor as long as ownership in the goods is retained by the company, the customer will store the goods separately and in such a way that they are identifiable as the property of the company. The customer is authorised to use or sell the goods in the ordinary course of business but only as fiduciary agent and bailee of the company until the customer pays the company in full.`,
  },
  {
    id: 'L',
    title: 'Displays and Signage',
    body: `The company may offer display containers for display of goods from time to time. Such point-of-sale aids remain the property of the company. The customer is entitled to use these aids for the goods for which they were intended and agrees not to place goods from other sources in or on these sales aids. Signage belonging to and/or paid for in whole or in part by the company shall remain the property of the company.`,
  },
  {
    id: 'M',
    title: 'Product Support and Sale of Product',
    body: `The customer agrees to provide product support at point of sale to end users. With the placing of an order the customer acknowledges that the company reserves the right to withdraw supply should this product support not be implemented. Products sold by the company have been designated for resale to certain types of outlets; the customer confirms it is aware of the company's marketing policy and will abide by its terms.`,
  },
  {
    id: 'N',
    title: 'Account Activity',
    body: `The company reserves the right to close a customer account where the level of activity is determined by the company as insufficient to meet company minimum business requirements. The company will at its own discretion determine the minimum business level and review this level as necessary.`,
  },
  {
    id: 'O',
    title: 'Waiver',
    body: `The company shall only accept a waiver if made in writing by the customer and accepted by the company. Any failure by the company to require strict performance of any of the terms or conditions contained herein shall not affect its rights under the terms of these conditions in respect of the supply of any existing or future orders.`,
  },
  {
    id: 'P',
    title: 'Applicable Law and Dispute Resolution',
    body: `In the event of any dispute between the company and the customer arising out of this agreement, the substantive laws of New Zealand shall apply and such dispute shall be referred to a mediator to be agreed between the parties, which can be the Small Claims Tribunal situated in the Auckland District. Upon failure to reach agreement, arbitration shall be conducted in accordance with the New Zealand Arbitration Act 1996 and any amendments thereof. All arbitration and legal hearings shall be conducted in Auckland, New Zealand.`,
  },
  {
    id: 'Q',
    title: 'Exclusion of Liability',
    body: `The company shall not be liable for indirect or consequential loss or for any loss to a customer arising from a third-party claim occasioned by errors in delivery of goods or by goods lost or delivered late by courier, carrier or post. The company is not in any circumstances the agent of the carrier or any public or private postal service.`,
  },
]

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <p className="page-eyebrow" style={{ justifyContent: 'flex-start' }}>Legal</p>
        <h1 className="page-hed">Terms of Trade</h1>
        <p className="page-sub">Petware Limited — Auckland, New Zealand</p>
      </div>

      <div className="legal-body">
        <div className="breadcrumb" style={{ padding: '0 0 2rem', position: 'static' }}>
          <Link href="/">Home</Link> / Terms &amp; Conditions
        </div>

        <div className="legal-section" style={{ marginBottom: '2.5rem' }}>
          <p className="legal-section-body" style={{ fontStyle: 'italic', opacity: 0.7 }}>
            In these Terms of Trade, &ldquo;the company&rdquo; means Petware Limited and those deriving title from
            Petware Limited. &ldquo;The customer&rdquo; includes the purchaser of the goods and those deriving title
            from the purchaser. &ldquo;Goods&rdquo; includes product supplied by the company.
          </p>
        </div>

        {sections.map((s) => (
          <div key={s.id} className="legal-section">
            <h2 className="legal-section-hed">{s.id}. {s.title}</h2>
            {s.body.split('\n\n').map((para, i) => (
              <p key={i} className="legal-section-body" style={i > 0 ? { marginTop: '1rem' } : undefined}>{para}</p>
            ))}
          </div>
        ))}

        <div className="legal-contact">
          <p>Questions about these terms? Contact us:</p>
          <a href="mailto:petware@petware.co.nz">petware@petware.co.nz</a>
          <span> · </span>
          <a href="tel:0800800135">0800 800 135</a>
        </div>
      </div>
    </div>
  )
}
