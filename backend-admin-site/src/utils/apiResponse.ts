export const successResponse = (data: any, meta: any = null) => {
  return {
    success: true,
    data,
    meta,
    error: null,
  };
};

export const errorResponse = (message: string, statusCode: number) => {
  return {
    success: false,
    data: null,
    meta: null,
    error: {
      message,
      statusCode,
    },
  };
};