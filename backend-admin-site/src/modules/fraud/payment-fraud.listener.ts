import { eventBus } from "../../core/events/event-bus.instance"
import { PaymentEvents } from "../payment/domain/payment-events"

eventBus.subscribe(PaymentEvents.PAYMENT_CREATED, async (payment) => {

  console.log("Fraud check started", payment)

})