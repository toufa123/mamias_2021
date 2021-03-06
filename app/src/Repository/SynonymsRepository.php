<?php

namespace App\Repository;

use App\Entity\Synonym;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Synonyms|null find($id, $lockMode = null, $lockVersion = null)
 * @method Synonyms|null findOneBy(array $criteria, array $orderBy = null)
 * @method Synonyms[]    findAll()
 * @method Synonyms[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SynonymsRepository extends ServiceEntityRepository
{
    public function __construct(\Doctrine\Common\Persistence\ManagerRegistry $registry)
    {
        parent::__construct($registry, Synonym::class);
    }

    // /**
    //  * @return Synonyms[] Returns an array of Synonyms objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Synonyms
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
