import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType, Root } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column('text', { unique: true })
    email: string

    // @ts-ignore
    @Field()
    name(@Root() parent: User): string {
        const { firstName, lastName } = parent
        return `${firstName} ${lastName}`
    }

    @Column()
    password: string

    @Column('bool', { default: false })
    confirmed: boolean
}
