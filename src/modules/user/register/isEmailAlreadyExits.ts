import {
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from 'class-validator'
import { User } from '../../../entity/user'

export class IsEmailAlreadyExitsConstraint implements ValidatorConstraintInterface {
    validate(email: string): Promise<boolean> | boolean {
        console.log('IsEmailAlreadyExitsConstraint')
        return User.findOne({where: {email}}).then(user => !!user)
    }
}

export function IsEmailAlreadyExits(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
          registerDecorator({
             target: object.constructor,
             propertyName: propertyName,
             options: validationOptions,
             constraints: [],
             validator: IsEmailAlreadyExitsConstraint
          });
    }
}
