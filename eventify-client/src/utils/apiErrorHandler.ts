export function apiErrorHandler(err : any) {
	return err?.response?.data?.errors[0]?.message ?? err.message;
}