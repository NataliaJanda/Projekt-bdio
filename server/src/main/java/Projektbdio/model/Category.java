package Projektbdio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="Category")
@Getter
@Setter
public class Category {
    @Id
    private int category_id;
    private String name;

}
