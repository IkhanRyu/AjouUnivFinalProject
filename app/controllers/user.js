/**
 * @author IkhanRyu
 * @since 2016. 9. 26.
 */
import models from "../models";

const user = models.user;

export default {
    create(req) {
        return user.insert({title: req.params.id});
    },
    
    find(req){
        return user.find(req.params.id);
    }
}