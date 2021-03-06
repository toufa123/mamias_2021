<?php

namespace App\Repository;

use App\Entity\Vectors;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Vectors|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vectors|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vectors[]    findAll()
 * @method Vectors[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VectorsRepository extends ServiceEntityRepository
{
    public function __construct(\Doctrine\Common\Persistence\ManagerRegistry $registry)
    {
        parent::__construct($registry, Vectors::class);
    }

    // /**
    //  * @return Vectors[] Returns an array of Vectors objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Vectors
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
