export type OpenNameModalOptions = {
    maxLen: number;
    title?: string;
    initialValue?: string;
}

export const DEFAULT_OPTIONS: OpenNameModalOptions = {
    maxLen: 16,
    title: "User Name:",
}

export function openNameModal(options?: OpenNameModalOptions) : Promise<string | null> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    function validate(raw: string): { ok: true; value: string} | { ok: false; value: string} {
        const trimmedStr= raw.trim();
        if (!trimmedStr) {
            return {
                ok : false,
                value : "Keinen Namen eingegeben!",
            }
        } else if (trimmedStr.length > opts.maxLen) {
            return {
                ok : false,
                value : "Maximal " + opts.maxLen + " Zeichen",
            }
        } else {
            return {
                ok : true,
                value : trimmedStr,
            }
        }
    }

    return new Promise<string | null>((resolve) => {
        let closed = false;

        const backdrop = document.createElement("div");
        backdrop.classList.add("fixed", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "p-4", "z-50");
        document.body.append(backdrop);

        function closeAndResolve(value: string | null)  {
            if (closed) return;
            closed = true;

            form.removeEventListener("submit", onSubmit)
            document.removeEventListener("keydown", onKeyDown);
            backdrop.removeEventListener("click", onBackdropClick)
            cancelButton.removeEventListener("click", onCancelClick);

            backdrop.remove();
            resolve(value);
        }

        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "rounded-2xl", "bg-white", "p-6", "shadow-lg", "text-gray-900");
        backdrop.append(card);

        const form = document.createElement("form");
        card.append(form);

        const title = document.createElement("h1");
        title.innerText = opts.title?? "Name eingeben";
        title.classList.add("text-xl", "font-semibold");
        form.append(title);

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Dein Name";
        input.maxLength = opts.maxLen;
        input.classList.add("mt-4", "w-full", "rounded-lg", "border", "px-3", "py.2", "focus:outline-none", "focus:ring-2");
        form.append(input);

        const errorEl = document.createElement("p");
        errorEl.classList.add("mt-2", "text-sm", "text-red-600", "hidden");
        form.append(errorEl);

        function showError(msg: string) {
            errorEl.textContent = msg;
            errorEl.classList.remove("hidden");
        }
        function clearError() {
            errorEl.textContent = "";
            errorEl.classList.add("hidden");
        }

        const wrapper = document.createElement("div");
        wrapper.classList.add("mt-6", "flex", "items-center", "justify-center", "gap-2")
        form.append(wrapper);

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "| Cancel |";
        cancelButton.type = "button";
        cancelButton.classList.add("items-center", "justify-center", "text-gray-700");
        form.append(cancelButton);

        const okButton = document.createElement("button");
        okButton.type = "submit";
        okButton.textContent = "| OK |";
        okButton.classList.add("items-center", "justify-center", "bg-black", "text-white", "mt-2", "ml-2");
        form.append(okButton);

        const onCancelClick = () => closeAndResolve(null);

        const onBackdropClick = (event: MouseEvent) => {
            if (event.target !== backdrop) return;

            closeAndResolve(null);
        }


        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            closeAndResolve(null);
        }

        function onSubmit (event:SubmitEvent) : void {
            event.preventDefault();


            const result = validate(input.value);
            if (result.ok) {
                closeAndResolve(result.value);
            } else {
                showError(result.value);
                input.focus();
            }
            clearError();
        }

        cancelButton.addEventListener("click", onCancelClick);
        backdrop.addEventListener("click", onBackdropClick);
        document.addEventListener("keydown", onKeyDown);
        form.addEventListener("submit", onSubmit);

        input.focus();

    });
}