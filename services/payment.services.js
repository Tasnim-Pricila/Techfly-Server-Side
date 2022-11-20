const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createPaymentServices = async (data) => {
    const price = data.price;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ['card']
    });
    return paymentIntent;
}