<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Swift_Mailer;
use Swift_Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    private $mailer;
    private $templating;

    public function __construct(Swift_Mailer $mailer, EngineInterface $templating)
    {
        $this->mailer = $mailer;
        $this->templating = $templating;
    }

    /**
     * @Route("/contact", name="contact",  options={"sitemap" = true})
     */
    public function index(Request $request, Swift_Mailer $mailer)
    {
        $pagetitle = 'Contact US';
        $contact = new Contact();

        // Add form fields

        $form = $this->createForm(ContactType::class);
        // Handle form and recaptcha response
        $form->handleRequest($request);

        // check if form is submitted and Recaptcha response is success
        if ($form->isSubmitted() && $form->isValid()) {
            $FirstName = $form['FirstName']->getData();
            $LastName = $form['LastName']->getData();
            $email = $form['email']->getData();
            $subject = $form['subject']->getData();
            $message = $form['message']->getData();

            // set form data
            $contact->setFirstName($FirstName);
            $contact->setLastName($LastName);
            $contact->setEmail($email);
            $contact->setSubject($subject);
            $contact->setMessage($message);

            // finally add data in database
            $sn = $this->getDoctrine()->getManager();
            $sn->persist($contact);
            $sn->flush();

            try {
                $message = (new Swift_Message())
                    //$message = \Swift_Message::newInstance()
                    ->setSubject($subject)
                    //->setFrom(['no-reply@mamias.org' => 'MAMIAS team'])
                    ->setFrom($this->getParameter('app.admin_email'), 'MAMIAS Admin')
                    ->setTo($email)
                    //->setBcc (['mamias2020@gmail.com' => 'MAMIAS team'])
                    ->setBody(
                        $this->renderView('contact/sendemail.html.twig', ['LastName' => $LastName, 'email' => $email]),
                        'text/html'
                    )
                    ->addPart(
                        'Hi ' . $LastName . '! Your Message is successfully Submitted.We will get back to you soon!
                        Thanks.
                        MAMIAS Admin',
                        'text/plain'
                    );

                $email = (new Swift_Message('Contact Message'))
                    //$message = \Swift_Message::newInstance()
                    //->setSubject ($subject)
                    ->setFrom($this->getParameter('app.admin_email'), 'MAMIAS Admin')
                    //->setFrom ('no-reply@mamias.org')
                    ->setTo('atef.ouerghi@spa-rac.org')
                    //->setBcc (['mamias2020@gmail.com' => 'MAMIAS team'])
                    ->setBody(
                        $this->renderView('contact/sendnotification.html.twig', ['email' => $email]),
                        'text/html'
                    )
                    ->addPart(
                        'Hi a Contact Messsage was sent from' . $email, 'text/plain');

                $mailer->send($message);
                $mailer->send($email);
                $this->addFlash('success', 'Your Message is sent. A confirmation Email was sent to your email adress !');

                return $this->redirectToRoute('contact');
            } catch (\Exception $e) {
                echo $e->getMessage();
            }
        }

        return $this->render(
            'contact/index.html.twig',
            ['form' => $form->createView(), 'pagetitle' => $pagetitle]
        );
    }
}
