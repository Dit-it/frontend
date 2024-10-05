export const postMultipartFormData = async (formData: FormData,
                                     uri: string) => {

    // fetch 요청
    try {
        console.log(formData);
        const response = await fetch(`https://www.didit.store/${uri}`, {
            method: 'POST',
            body: formData,
        });

        const responseJson = await response.text();
        console.log('Server response:', responseJson);
    } catch (error) {
        console.error('Upload failed:', error);
    }
}