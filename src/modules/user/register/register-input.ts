import { Length, IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyExits } from './isEmailAlreadyExits'

// @Arg('firstName') firstName: string,
// @Arg('lastName') lastName: string,
// @Arg('email') email: string,
// @Arg('password') password: string,

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExits({ message: 'email already exists' })
    email: string;

    @Field()
    password: string;
}