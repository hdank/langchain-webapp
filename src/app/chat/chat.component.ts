import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Ollama } from '@langchain/community/llms/ollama';
interface ApiResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  encapsulation: ViewEncapsulation.None //apllying the css of the component to the insert element from user
})

export class ChatComponent implements OnInit {
  private apiUrl = "http://localhost:11434/api/generate";
  constructor(private router: Router,private http:HttpClient){}
  ngOnInit(): void {
    var token = localStorage.getItem('authToken');
    if(token!= null){
      console.log("Chat page");
    }
    else{
      this.router.navigate(['/login']);
    }

  }
  async send(input: string): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      model: 'llama3.1',
      prompt: input,
      stream: true,
    };
  
    try {
      // Make the HTTP POST request and manually handle the response stream
    const response = await this.http.post(this.apiUrl, body, { headers, responseType: 'text' }).toPromise();

    // Split the response by new lines (assuming each JSON object is separated by a newline)
    const jsonObjects = response!.split('\n');

    let fullResponse = '';  // Accumulate the full response here

    // Process each JSON object
    let div2;
      let p2;
      p2 = document.createElement('p');
      p2.className = 'response';
      div2 = document.createElement('div');
      div2.className = 'message-box left';
      div2.appendChild(p2!);
    jsonObjects.forEach(jsonString => {
      
      if (jsonString.trim()) { // Ignore empty lines
        try {
          const parsedResponse = JSON.parse(jsonString) as ApiResponse;

          p2.append(parsedResponse.response);

        } catch (jsonError) {
          console.error('Failed to parse JSON:', jsonError);
        }
      }
      
    });

    document.getElementById('messages-container')?.appendChild(div2!);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
  }
  sendMessage(){
    var input = (<HTMLTextAreaElement>document.getElementById('textarea')).value;
    var now = new Date();
    if(input != null){
      var div = document.createElement('div');
      var p = document.createElement('p');
      var time = document.createElement('p');
      p.innerHTML = input;
      time.innerHTML = now.toLocaleString();
      div.className ="message-box right";
      div.appendChild(time);
      div.appendChild(p);
      document.getElementById('messages-container')?.appendChild(div);
      (<HTMLTextAreaElement>document.getElementById('textarea')).value ="";

      //Response from bot
      const headers = new HttpHeaders({
        'Content-Type':'application/json'
      });
      var div2 = document.createElement('div');
      var p2 = document.createElement('p');
      var time2 = document.createElement('p');
      div2.className ="message-box left";
      time2.innerHTML = now.toLocaleString();
      p2.className ="response";
      var aResponse ="";
      this.send(input);
      //A request body is a Json object
      // const body ={"model": "llama3.1", 
      //              "prompt": input, 
      //              "stream": false}
      // this.http.post(this.apiUrl, body, {headers})
      // .subscribe(
      //   (response:any) => {aResponse = response['response']; 
      //               console.log(aResponse);
      //               p2.innerHTML = aResponse;
      //               div2.appendChild(time2);
      //               div2.appendChild(p2);
      //               document.getElementById('messages-container')?.appendChild(div2);
      //             },
      //   error => console.error(error)
      // );
      

      
      
    }
  }
}
