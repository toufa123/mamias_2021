<?php

namespace App\Controller;

use App\Application\Sonata\UserBundle\Entity\User;
use App\Entity\Mamias;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class NfpController extends AbstractController
{
    /**
     * @Route("/nfp", name="nfp",  options={"sitemap" = true})
     * @IsGranted("ROLE_FOCALPOINT")
     */
    public function index()
    {
        $n1 = null;
        $n2 = null;
        $n3 = null;
        $co = null;
        $userCountry = null;

        $em = $this->getDoctrine()->getManager();
        $a = $this->getUser();
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ('' != $user) {
            $username = $this->get('security.token_storage')->getToken()->getUser()->getUsername();
            $userId = $this->get('security.token_storage')->getToken()->getUser()->getId();
            $Country = $this->get('security.token_storage')->getToken()->getUser()->getCountry();
            $userCountry = $this->get('security.token_storage')->getToken()->getUser()->getCountry()->getId();
            //dump($userCountry);die;

            $n1 = $em->getRepository(Mamias::class)->findnumbersBycountry($userCountry);
            dd($n1);
            $n2 = $em->getRepository(Mamias::class)->findnumbersByestablished($userCountry);
            $n3 = $em->getRepository(Mamias::class)->findnumbersByInvasive($userCountry);

            $species = $em->getRepository(Mamias::class)->findSpeciesByCountry($userCountry);
            //$userManager = $this->get('fos_user.user_manager');
            // $national_expert = $this->container->get('fos_user.user_manager')->findUserBy(array('country'=>$userCountry));
            //dump($national_expert);die;

            $query = $this->getDoctrine()->getEntityManager()
                ->createQuery('SELECT u FROM App\Application\Sonata\UserBundle\Entity\User u WHERE u.country = :country'
                )->setParameter('country', $userCountry);

            $national_expert = $query->getResult();
            //dump($national_expert);die;

            return $this->render(
                'nfp/index.html.twig',
                [
                    'country' => $Country,
                    'n1' => $n1,
                    'n2' => $n2,
                    'n3' => $n3,
                    'species' => $species,
                    'national_expert' => $national_expert,
                ]
            );
        } else {
            return $this->forward($this->generateUrl('sonata_user_admin_security_login'));
        }
    }

    /*
     * @Route("/user/{id}", name="fos_user_profile_show_user")
     * @IsGranted("ROLE_FOCALPOINT")
     */
    public function showAction($id)
    {
        $userID = $this->get('security.token_storage')->getToken()->getUser()->getId();
        $em = $this->getDoctrine()->getManager()
            ->createQuery('SELECT u FROM App\Application\Sonata\UserBundle\Entity\User u WHERE u.id = :id'
            )->setParameter('id', $userID);

        $national_expert = $em->getResult();

        return $this->render('FOSUserBundle:Profile:show_content.html.twig', [
            'entity' => $national_expert,
        ]);
    }
}
