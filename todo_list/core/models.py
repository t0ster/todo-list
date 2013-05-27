from django.db import models
from django.contrib.auth.models import User


class TodoList(models.Model):
    user = models.ForeignKey(User)

    def __unicode__(self):
        return "Todo List for %s" % self.user


class Entry(models.Model):
    todo_list = models.ForeignKey(TodoList)
    completed = models.BooleanField(default=False)
    text = models.CharField(max_length=255)
    priority = models.IntegerField(default=0)
    due_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'entries'

    # def save(self, *args, **kwargs):
    #     self.priority = self.__class__.objects.filter(todo_list=self.todo_list).count() + 1
    #     super(Entry, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.text
