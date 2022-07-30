import Swal from "sweetalert2";
import toastr from "toastr";

export function messageToastr(message,type){
    switch(type){
        case 'success':
            return toastr.success(message);
        case 'error':
            return toastr.error(message);
        default:
            return;
    }
}
export function messageSweetAlert(title,message,type){
    return Swal.fire(title,message,type);
}
export function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

