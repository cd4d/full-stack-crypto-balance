import { React} from "react";

export default function RefreshRatesBtn({onRefreshRates}){
    
    return( <button
              type="button"
              className="btn btn-secondary mt-1 me-1 btn-sm float-end"
              onClick={onRefreshRates}
            >
              <i className="pi pi-refresh" aria-hidden="true"></i>
              <span className="d-sm-none d-lg-inline"> Refresh rates</span>
            </button>)
   
}