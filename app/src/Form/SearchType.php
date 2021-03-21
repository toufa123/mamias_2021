<?php

namespace App\Form;

use App\Entity\Catalogue;
use App\Entity\Country;
use App\Entity\EcAp;
use App\Entity\Ecofunctional;
use App\Entity\Invasiveness;
use App\Entity\Mamias;
use App\Entity\Origin;
use App\Entity\RegionalSea;
use App\Entity\SearchSpecies;
use App\Entity\Status;
use App\Entity\SuccessType;
use App\Entity\VectorName;
use App\Repository\CountryRepository;
use App\Repository\OriginRepository;
use App\Repository\SuccessTypeRepository;
use App\Repository\EcofunctionalRepository;
use App\Repository\RegionalSeaRepository;
use App\Repository\CatalogueRepository;
use App\Repository\VectorNameRepository;
use Gedmo\Tree\Entity\Repository\NestedTreeRepository;
use App\Repository\EcApRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\ResetType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'speciesName',
                EntityType::class,
                [
                    'class' => Mamias::class,
                    'placeholder' => 'Select your Species',
                    'choice_label' => 'relation',
                    'choice_value' => 'id',
                    'required' => false,
                ]
            )
            ->add(
                'ecofunctional',
                EntityType::class,
                [
                    'class' => Ecofunctional::class,
                    'query_builder' => function (EcofunctionalRepository $er) {
                        return $er->createQueryBuilder('a')
                            ->orderBy('a.ecofunctional', 'ASC');
                    },
                    'placeholder' => 'Select an EcoFunctional Group',
                    'choice_value' => 'id',
                    'choice_label' => 'ecofunctional',
                    'attr' => ['class' => 'select2'],
                    'required' => false,
                ]
            )
            ->add(
                'origin',
                EntityType::class,
                [

                    'query_builder' => function (OriginRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.originRegion', 'ASC');
                    },
                    'class' => Origin::class,
                    'placeholder' => 'Select the Orgin',
                    'choice_label' => 'originRegion',
                    'choice_value' => 'id',
                    'required' => false,
                ]
            )
            ->add(
                'med1stSighting',
                ChoiceType::class,
                [
                    'choices' => $this->getYears(1792),
                    'placeholder' => 'Select Year of First Med Sighting',
                    'attr' => ['class' => 'select2'],
                    'required' => false,
                ]
            )
            ->add(
                'successType',
                EntityType::class,
                [
                    'class' => SuccessType::class,
                    'query_builder' => function (SuccessTypeRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.successType', 'ASC');
                    },
                    'placeholder' => 'Select Establishment',
                    'choice_label' => 'successType',
                    'choice_value' => 'id',
                    'attr' => ['class' => 'select2'],
                    'required' => false,
                ]
            )

            ->add(
                'country',
                EntityType::class,
                [
                    'class' => Country::class,
                    'query_builder' => function (CountryRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.country', 'ASC');
                    },
                    'placeholder' => 'Select A country',
                    'choice_label' => 'country',
                    'choice_value' => 'id',
                    'attr' => ['class' => 'form-control select2'],
                    'required' => false,
                ]
            )
            ->add(
                'regionalSea',
                EntityType::class,
                [
                    'class' => RegionalSea::class,
                    'query_builder' => function (RegionalSeaRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.regionalSea', 'ASC');
                    },
                    'placeholder' => 'Select a Sea',
                    'choice_label' => 'regionalSea',
                    'choice_value' => 'id',
                    'attr' => ['class' => 'form-control select2'],
                    'required' => false
                ]
            )
            ->add(
                'Ecap',
                EntityType::class,
                [
                    'class' => EcAp::class,
                    'query_builder' => function (EcApRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.ecap', 'ASC');
                    },

                    'placeholder' => 'Select EcAp SubRegion',
                    'choice_label' => 'ecap',
                    'choice_value' => 'id',
                    'attr' => ['class' => 'select2'],
                    'required' => false,
                ]
            )
            //->add(
            //    'invasive',
            //    EntityType::class,
            //    [
            //        'class' => Invasiveness::class,
            //        'placeholder' => 'Select Impact',
            //        'choice_label' => 'invasivness',
            //        'choice_value' => 'id',
            //        'attr' => ['class' => 'select2'],
            //        'required' => false,
            //    ]
            //)
            ->add(
                'status',
                EntityType::class,
                [
                    'class' => Status::class,
                    'placeholder' => 'Select Med Species Status',
                    'choice_label' => 'status',
                    'choice_value' => 'id',
                    'attr' => ['class' => 'select2'],
                    'required' => false,
                ]
            )
            ->add(
                'vectorName',
                EntityType::class,
                [
                    'class' => VectorName::class,
                    'query_builder' => function (NestedTreeRepository $er) {
                        return $er->createQueryBuilder('f')
                            ->orderBy('f.vectorName', 'ASC');
                    },
                    'choice_label' => 'vectorName',
                    'expanded' => false,
                    'required' => false,
                    'placeholder' => 'Select A Pathway',
                    'attr' => ['class' => 'select2'],
                    'multiple' => false,
                    //'attr' => [
                    //    'class' => 'select2 select2-multiple',
                    //    'multiple' => 'multiple',
                    //    'multiple',
                    //    'data-placeholder' => 'Select A Vector/Pathway'
                    // ],
                ]
            );
        //->add('reset', ResetType::class);
    }

    private function getYears($min, $max = 'current')
    {
        $years = range($min, ('current' === $max ? date('Y') + 10 : $max));

        return array_combine($years, $years);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'data_class' => SearchSpecies::class,
                'methode' => 'get',
                'csrf_protection' => false,
                'validation_groups' => false,
            ]
        );
    }

    public function getBlockPrefix()
    {
        return ''; // TODO: Change the autogenerated stub
    }
}
