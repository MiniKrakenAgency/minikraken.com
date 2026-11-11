import type { Handle, HandleServerError } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/i18n/paraglide/server";
import { distributedId } from "nope-id";
import { baseLocale } from "$paraglide/runtime";

//Todo: adapt all pages to the translations
export const handle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;

    event.locals = {
      i18n: {
        baseLocale,
        locale,
      },
      requestInfo: {
        id: distributedId(),
      },
    };

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%lang%", () => locale),
    });
  });

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
  const errorId = distributedId();

  console.error("Server error", {
    error,
    errorId,
    message,
    status,
    url: event.url.href,
  });

  return {
    errorId,
    message,
  };
};

/*Export const handleValidationError: HandleValidationError = () => {
	//todo: add logging for errors
	return {
		errorId: nanoid(),
		message:
	}
}*/
