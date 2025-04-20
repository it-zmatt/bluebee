from django.db import models

class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    ticket = models.TextField()

    def __str__(self):
        return f"Ticket {self.ticket_id}: {self.ticket[:50]}"  # Show a snippet of the ticket
