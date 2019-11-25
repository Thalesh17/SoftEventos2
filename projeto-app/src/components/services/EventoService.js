import axios from 'axios';

const EVENTO_API_BASE_URL = 'http://localhost:5000/api/evento';

class EventoService {

    fetchEventos() {
        return axios.get(EVENTO_API_BASE_URL);
    }

    fetchEventoById(eventoId) {
        return axios.get(EVENTO_API_BASE_URL + '/' + eventoId);
    }

    deleteEvento(eventoId) {
        return axios.delete(EVENTO_API_BASE_URL + '/' + eventoId);
    }

    addEvento(evento) {
        return axios.post(EVENTO_API_BASE_URL, evento);
    }

    editEvento(evento) {
        return axios.put(EVENTO_API_BASE_URL + '/' + evento.Id, evento);
    }

    postUpload(file, name) {
        const fileToUplaod = file[0];
        const formData = new FormData();
        formData.append('file', fileToUplaod, name);
    
        return this.http.post(`${this.EVENTO_API_BASE_URL}/upload`, formData);
      }

}

export default new EventoService();
