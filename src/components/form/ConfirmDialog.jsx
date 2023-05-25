import Swal from "sweetalert2"

const ConfirmDialog = ({ title, text, link, onSuccess }) => {

    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return fetch(link)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          onSuccess()
        }
    })
}

export default ConfirmDialog