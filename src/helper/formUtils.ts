const processErros = (fields: any, error: any) => {
  try {
    let errorMessages: any = {};
    for (const [key] of Object.entries(fields)) {
      errorMessages[key] = error[key];
    }
    return errorMessages;
  } catch (error) {
    return {};
  }
};

export { processErros };
