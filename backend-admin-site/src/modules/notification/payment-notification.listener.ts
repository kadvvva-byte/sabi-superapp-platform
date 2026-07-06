import { eventBus } from "../../core/events/event-bus.instance"
import { PaymentEvents } from "../payment/domain/payment-events"

eventBus.subscribe(PaymentEvents.PAYMENT_COMPLETED, async (payment) => {

  console.log("Send notification")

})