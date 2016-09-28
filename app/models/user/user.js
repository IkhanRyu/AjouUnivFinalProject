/**
 * @author IkhanRyu
 * @since 2016. 9. 26.
 */
import mongoose from 'mongoose';
import ModelError from '../ModelError';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    title : {type : String}
}, {
    toObject : {
        transform(doc, ret, options){
            delete ret['__v'];
            return ret;
        }
    }
});

const User = mongoose.model('User', UserSchema);

class UserModel{

    insert(user){
        return new User(user).save()
            .then(result => result.toObject())
            .catch(err => {
                return Promise.reject(ModelError.createValidationError(err.message));
            })
    }
    
    find(title){
        return User.findOne({title : title})
            .then(result => result.toObject())
            .catch(err => {
                return Promise.reject(ModelError.createValidationError(err.message));
            })
    }
}

export default new UserModel();