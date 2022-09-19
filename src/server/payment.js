import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
    Button,
    Box,
    TextField
} from '@mui/material';

//-----------------------------------------------------------------------
// SWAPPY PAY
//-----------------------------------------------------------------------

export async function swappyPay(price, qty) {
    const tot = price * qty;
    const uri = `https://www.swappy.ws/pay.php?api_code=${process.env.REACT_APP_SWAPPY_API_CODE}&price=${price}&qty=${qty}&total_price=${tot}`;

    window.open(uri, "_blank");
};

export async function stripePay(body) {
    console.log('swappyPay body: ', body);
};

//-----------------------------------------------------------------------
// STRIPE 
//-----------------------------------------------------------------------

export function calculateOrderAmount(n) {
    return (((3 * n) + 0.3) / (1 - 0.03)).toFixed(2);
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY, {
    betas: ["process_order_beta_1"],
    apiVersion: "2019-09-09; orders_beta=v3"
});

function CheckoutForm(id) {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecretUrl = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecretUrl) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecretUrl).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `https://www.testnet.dreamhunters.io/tx/${id}`,
                receipt_email: email,
                payment_method_data: {
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    size="small"
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    size="small"
                />
            </Box>
            <PaymentElement id="payment-element" />
            <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={isLoading || !stripe || !elements}
                sx={{
                    marginTop: '1rem',
                    display: 'block',
                    width: '100%',
                    borderRadius: '9px',
                    fontSize: '1rem',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    padding: '0.5rem 1rem',
                    border: 'none',
                }}
                type="submit"
            >
                {isLoading ? 'Loading...' : 'Buy Now'}
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export function StripePayment({ desc, address, qty }) {
    const [clientSecret, setClientSecret] = useState("");
    const [txId, setTxId] = useState("");
    const [activeMode, setActiveMode] = useState('night');
    const customizer = useSelector((state) => state.CustomizerReducer);

    useEffect(() => {
        if (customizer.activeMode === 'dark') {
            setActiveMode('night');
        } else {
            setActiveMode('flat');
        }
    }, [customizer.activeMode]);

    const body = {
        description: `${desc};${address};${qty}`,
        qty: qty,
    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://api.dreamhunter.io/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setTxId(data.id);
            });
    }, []);

    const appearance = {
        theme: activeMode,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm id={txId} />
                </Elements>
            )}
        </div>
    );
}