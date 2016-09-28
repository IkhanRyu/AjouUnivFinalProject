/**
 * @author IkhanRyu
 * @since 2016. 9. 26.
 */
import {VALIDATION_ERR} from '../models/ModelError';

export default function(controller){
    return (req, res, next) => {
        controller(req)
            .then(result => res.status(200).json(result))
            .catch(err => {
                if(err.type === VALIDATION_ERR){
                    res.status(400).json({message : err.message});
                    return;
                }
                
                res.status(500).json(err);
            })
    }
}