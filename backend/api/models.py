from django.db import models

class Image(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True, default="default.jpg")
    created = models .DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
