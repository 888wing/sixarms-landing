'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  email: string
  onSuccess: () => void
  onError: (error: string) => void
}

const PaymentForm = ({ email, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setProcessing(true)

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const { clientSecret } = await response.json()

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email,
          },
        },
      })

      if (result.error) {
        onError(result.error.message || 'Payment failed')
      } else {
        onSuccess()
      }
    } catch (err) {
      onError((err as Error).message || 'Something went wrong')
    } finally {
      setProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'transparent',
        '::placeholder': {
          color: '#808080',
        },
        ':focus': {
          color: '#ffffff',
        },
      },
      invalid: {
        color: '#FF6B6B',
        iconColor: '#FF6B6B',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent transition-all">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="text-sm text-light-gray">
        <p>• You&apos;ll be charged $10/month</p>
        <p>• Cancel anytime from your dashboard</p>
        <p>• Secure payment processed by Stripe</p>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Start Subscription'}
      </Button>
    </form>
  )
}

interface StripePaymentProps {
  email: string
  onSuccess: () => void
  onError: (error: string) => void
}

export const StripePayment = ({ email, onSuccess, onError }: StripePaymentProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm email={email} onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}