import { Router } from 'express';
import uploadController from '../controller/uploadController';
import confirmController from '../controller/confirmController';
import listController from '../controller/listController';
import { getMeasures } from '../controller/measureController';


const router = Router();

router.post('/upload', uploadController);
router.patch('/confirm', confirmController);
router.get('/:customer_code/list', listController);
router.get('/:customer_code/list', getMeasures);




export default router;
