import { fromZodError } from 'zod-validation-error';
import httpStatus from 'http-status';
import ApiError from '../utilities/ApiError.js';

const validate = async (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        console.log(fromZodError(result.error).toString());
        throw new ApiError({
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Validation Error',
            data: fromZodError(result.error).details,
        });
    }
    return result.data;
};

export { validate };
