import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-general-dsa',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './general-dsa.component.html',
  styleUrl: './general-dsa.component.css'
})
export class GeneralDSAComponent implements OnInit{
  private baseUrl = "http://localhost:8080/user";
  imgPath= "/public/table.jpg"
  private displayHtml!: String;
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/general`, {responseType: 'text'}).pipe(
      map(response => response), 
      catchError(error => {console.error("Error occurred: ", error);
                           return of(null);
      })
    )
        .subscribe(response => {
          if(response){
            console.log(response);
            document.getElementById('graph')!.innerHTML = response.toString();
          }
          else {
            console.log('No response received or an error occurred.');
          }
        })
  }
}
