import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function Faqs() {
    return (

      <div className="mt-[100px] flex flex-col gap-4">
        <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl opacity-70">
          FAQs
        </h1>
        </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is HealSync?</AccordionTrigger>
          <AccordionContent>
          HealSync is a doctor consultancy service that provides users with access to healthcare professionals through an online platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does HealSync work?</AccordionTrigger>
          <AccordionContent>
          HealSync allows users to connect with doctors remotely for consultations. Users can schedule appointments, discuss their health concerns, and receive medical advice through the HealSync platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is HealSync accessible to everyone?</AccordionTrigger>
          <AccordionContent>
          Yes, HealSync is designed to be accessible to all users. It follows the WAI-ARIA design pattern, ensuring accessibility standards are met.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I customize the appearance of HealSync?</AccordionTrigger>
          <AccordionContent>
          While HealSync comes with default styles that match its aesthetic, users may have the option to customize certain aspects of the platform to suit their preferences.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Are consultations on HealSync private and secure?</AccordionTrigger>
          <AccordionContent>
          Yes, HealSync prioritizes user privacy and security. All consultations are conducted in a confidential manner, and appropriate measures are taken to safeguard user data.
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="item-6">
          <AccordionTrigger>Is there a fee for using HealSync?</AccordionTrigger>
          <AccordionContent>
          HealSync may have subscription plans or pay-per-consultation options, depending on the model chosen by the service provider. Users should check the pricing details on the HealSync platform.
          </AccordionContent>
        </AccordionItem>

      </Accordion>
      </div>
    )
  }
  